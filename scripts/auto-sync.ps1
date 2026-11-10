# Auto-sync: keeps this folder, GitHub and the live site in step, on every computer you work from.
#   (no switch)  commit all changes, fetch what other computers pushed, push, redeploy the live site
#   -PullOnly    only download the latest version from GitHub (run when a work session starts)
# Run by Claude Code hooks (see scripts\setup-pc.ps1); safe to run by hand too:
#   powershell -ExecutionPolicy Bypass -File scripts\auto-sync.ps1
# Files listed in .gitignore (.env.local, node_modules, .next, .data ...) are never uploaded.
param([switch]$PullOnly)

$ErrorActionPreference = "Continue"
$env:Path = "C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;" + $env:Path

$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo

if (-not (Get-Command git -ErrorAction SilentlyContinue)) { exit 0 }
if (-not (Test-Path (Join-Path $repo ".git"))) { exit 0 }

$log = Join-Path $repo ".git\auto-sync.log"
$stamp = Get-Date -Format "yyyy-MM-dd HH:mm"
function Write-SyncLog($text) { Add-Content -Path $log -Value "$stamp  $text" -Encoding utf8 }

$branch = git rev-parse --abbrev-ref HEAD

if ($PullOnly) {
    # Only fast-forward a clean folder; unfinished local work is left alone for the normal sync.
    if (-not (git status --porcelain)) {
        $before = git rev-parse HEAD
        git pull -q --ff-only origin $branch 2>$null | Out-Null
        if ($LASTEXITCODE -ne 0) { Write-SyncLog "pull failed (offline?)" }
        elseif ((git rev-parse HEAD) -ne $before) { Write-SyncLog "pulled latest from GitHub" }
    }
    exit 0
}

git add -A 2>$null | Out-Null
if (git status --porcelain) {
    git commit -q -m "Auto-sync: $stamp" 2>$null | Out-Null
}

# Bring in commits pushed from another computer before pushing ours.
git fetch -q origin $branch 2>$null | Out-Null
if ($LASTEXITCODE -eq 0) {
    $behind = git rev-list --count "HEAD..origin/$branch" 2>$null
    if ([int]$behind -gt 0) {
        git rebase -q "origin/$branch" 2>$null | Out-Null
        if ($LASTEXITCODE -ne 0) {
            git rebase --abort 2>$null | Out-Null
            Write-SyncLog "CONFLICT with changes from another computer - nothing pushed, needs a manual merge"
            exit 0
        }
        Write-SyncLog "merged $behind commit(s) from GitHub"
    }
}

# Push whenever the local branch is ahead (also retries a push that failed earlier, e.g. offline).
$ahead = git rev-list --count "origin/$branch..HEAD" 2>$null
if ($LASTEXITCODE -ne 0 -or [int]$ahead -gt 0) {
    git push -q origin $branch 2>$null | Out-Null
    if ($LASTEXITCODE -eq 0) { $result = "pushed" } else { $result = "PUSH FAILED (will retry next time)" }
    Write-SyncLog $result

    # After a successful push, redeploy the live site on Vercel in the background
    # (uses the Vercel CLI login on this computer; output goes to .git\vercel-deploy.log).
    if ($result -eq "pushed" -and (Test-Path (Join-Path $repo ".vercel\project.json"))) {
        $deployLog = Join-Path $repo ".git\vercel-deploy.log"
        $cmd = "Set-Location '$repo'; npx --yes vercel deploy --prod --yes *> '$deployLog'"
        Start-Process -FilePath "powershell" -WindowStyle Hidden `
            -ArgumentList "-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", $cmd
        Write-SyncLog "vercel deploy started"
    }
}

exit 0

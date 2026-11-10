# Auto-sync: commits every change in this repository and pushes it to GitHub.
# Run by a Claude Code "Stop" hook after each editing turn; safe to run by hand too:
#   powershell -ExecutionPolicy Bypass -File scripts\auto-sync.ps1
# Files listed in .gitignore (.env.local, node_modules, .next, .data ...) are never uploaded.

$ErrorActionPreference = "Continue"
$env:Path = "C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;" + $env:Path

$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo

if (-not (Get-Command git -ErrorAction SilentlyContinue)) { exit 0 }
if (-not (Test-Path (Join-Path $repo ".git"))) { exit 0 }

$log = Join-Path $repo ".git\auto-sync.log"
$stamp = Get-Date -Format "yyyy-MM-dd HH:mm"

git add -A 2>$null | Out-Null
$pending = git status --porcelain
if ($pending) {
    git commit -q -m "Auto-sync: $stamp" 2>$null | Out-Null
}

# Push whenever the local branch is ahead (also retries a push that failed earlier, e.g. offline).
$branch = git rev-parse --abbrev-ref HEAD
$ahead = git rev-list --count "origin/$branch..HEAD" 2>$null
if ($LASTEXITCODE -ne 0 -or [int]$ahead -gt 0) {
    git push -q origin $branch 2>$null | Out-Null
    if ($LASTEXITCODE -eq 0) { $result = "pushed" } else { $result = "PUSH FAILED (will retry next time)" }
    Add-Content -Path $log -Value "$stamp  $result" -Encoding utf8
}

exit 0

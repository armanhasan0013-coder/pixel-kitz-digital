# One-time setup for each computer you work on. Run it once inside the cloned folder:
#   powershell -ExecutionPolicy Bypass -File scripts\setup-pc.ps1
# It checks the required tools, installs dependencies, and turns on automatic GitHub sync
# for Claude Code on this computer (download latest at session start, upload after each edit).

$ErrorActionPreference = "Stop"
$env:Path = "C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;" + $env:Path

$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo

$missing = @()
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { $missing += "Git         winget install --id Git.Git -e" }
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { $missing += "Node.js     winget install --id OpenJS.NodeJS.LTS -e" }
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) { $missing += "GitHub CLI  winget install --id GitHub.cli -e" }
if ($missing.Count -gt 0) {
    Write-Host "Install these first, open a new terminal, then run this script again:" -ForegroundColor Yellow
    $missing | ForEach-Object { Write-Host "  $_" }
    exit 1
}

# Commit identity: GitHub's private no-reply address, so no personal email is published.
gh auth status 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Not signed in to GitHub. Run:  gh auth login --web --git-protocol https   then run this script again." -ForegroundColor Yellow
    exit 1
}
gh auth setup-git
$login = gh api user --jq ".login"
$id = gh api user --jq ".id"
git config user.name $login
git config user.email "$id+$login@users.noreply.github.com"
git config core.autocrlf true

# Claude Code hooks for this computer (kept out of Git: the paths differ per computer).
$sync = Join-Path $repo "scripts\auto-sync.ps1"
$run = "powershell -NoProfile -ExecutionPolicy Bypass -File `"$sync`""
$settings = [ordered]@{
    hooks = [ordered]@{
        SessionStart = @(@{ hooks = @(@{ type = "command"; command = "$run -PullOnly"; timeout = 60 }) })
        Stop         = @(@{ hooks = @(@{ type = "command"; command = $run; timeout = 120 }) })
    }
}
$claudeDir = Join-Path $repo ".claude"
New-Item -ItemType Directory -Force $claudeDir | Out-Null
$json = $settings | ConvertTo-Json -Depth 10
[System.IO.File]::WriteAllText((Join-Path $claudeDir "settings.local.json"), $json)

if (-not (Test-Path (Join-Path $repo ".env.local"))) { Copy-Item (Join-Path $repo ".env.example") (Join-Path $repo ".env.local") }

Write-Host "Installing dependencies..."
npm install

Write-Host ""
Write-Host "Done. GitHub sync is on for Claude Code in this folder." -ForegroundColor Green
if (-not (Test-Path (Join-Path $repo ".vercel\project.json"))) {
    Write-Host "To also update the live site from this computer, run these two once:" -ForegroundColor Yellow
    Write-Host "  npx vercel login"
    Write-Host "  npx vercel link --yes --project pixel-kitz-digital"
}

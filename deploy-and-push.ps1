# Deploy-and-Push helper script for Endoholic Platform
# Save this file and run it in PowerShell (Right-click -> Run with PowerShell)
# It will: install deps, build project, create git commit and push to GitHub (will ask credentials if needed)

$projectPath = Split-Path -Parent $MyInvocation.MyCommand.Definition
Write-Host "Working folder: $projectPath`n" -ForegroundColor Cyan

Set-Location $projectPath

function Check-Command($name){
    $c = Get-Command $name -ErrorAction SilentlyContinue
    return $null -ne $c
}

if (-not (Check-Command npm)){
    Write-Host "npm is not installed or not in PATH. Please install Node.js from https://nodejs.org/ and try again." -ForegroundColor Red
    Pause
    exit 1
}

if (-not (Check-Command git)){
    Write-Host "git is not installed or not in PATH. Please install Git from https://git-scm.com/downloads and try again." -ForegroundColor Red
    Pause
    exit 1
}

Write-Host "Installing dependencies (this may take a few minutes)..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0){
    Write-Host "npm install failed. Check the output and fix errors before continuing." -ForegroundColor Red
    Pause
    exit 1
}

# Ensure runtime deps for PDF and Tailwind tooling
npm install react-pdf pdfjs-dist --save
npm install -D tailwindcss postcss autoprefixer

Write-Host "Building project (npm run build)..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0){
    Write-Host "Build failed. Open the build output, fix errors, then run this script again." -ForegroundColor Red
    Pause
    exit 1
}

Write-Host "Build succeeded." -ForegroundColor Green

# Initialize git if needed, add & commit
if (-not (Test-Path .git)){
    Write-Host "Initializing git repository..." -ForegroundColor Cyan
    git init
}

Write-Host "Staging files and committing..." -ForegroundColor Cyan
git add .
$commitMessage = Read-Host "Commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($commitMessage)) { $commitMessage = "Deploy: fixed CSS, dependencies, and PDF viewer" }
try{
    git commit -m $commitMessage -q
    Write-Host "Committed changes." -ForegroundColor Green
} catch {
    Write-Host "No new changes to commit or commit failed (this is okay if already up to date)." -ForegroundColor Yellow
}

$defaultRemote = "https://github.com/duaa0safaa-blip/endoholic-platform.git"
$remoteUrl = Read-Host "GitHub remote URL (press Enter to use default: $defaultRemote)"
if ([string]::IsNullOrWhiteSpace($remoteUrl)) { $remoteUrl = $defaultRemote }

$originExists = @(git remote) -contains "origin"
if ($originExists){
    git remote set-url origin $remoteUrl
} else {
    git remote add origin $remoteUrl
}

Write-Host "Pushing to origin main..." -ForegroundColor Cyan
# Ensure branch main
git branch -M main 2>$null

try{
    git push -u origin main
    if ($LASTEXITCODE -eq 0){
        Write-Host "Push succeeded. Vercel will redeploy automatically from the main branch." -ForegroundColor Green
    } else {
        Write-Host "git push returned a non-zero exit code. If prompted, provide GitHub username and a Personal Access Token (PAT) as password." -ForegroundColor Yellow
    }
} catch {
    Write-Host "git push failed. If authentication is required, use a Personal Access Token (PAT) when prompted for password or set up SSH keys." -ForegroundColor Red
}

Write-Host "Done. Open Vercel dashboard and redeploy if needed." -ForegroundColor Cyan
Pause

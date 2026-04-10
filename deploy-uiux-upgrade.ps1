# ============================================================
# Empire & Influence — Deploy UI/UX Upgrade
# Portrait fixes, advisor state system, event trigger system
# Run from ANYWHERE — deploys to GitHub → Netlify
# ============================================================

$projectRoot = "C:\Users\hartm\APUSH\EI\EI"

Write-Host ""
Write-Host "=== Empire & Influence UI/UX Upgrade Deploy ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Verify files exist
Write-Host "[1/3] Verifying changed files..." -ForegroundColor Yellow

$changedFiles = @(
    "src\styles\design-system.css",
    "src\components\game-renderer.js",
    "src\components\ui-components.js",
    "src\components\sidebar.js",
    "src\data\lesson-01-cuba.js",
    "Assets_Organized\L01_Cuba\events"
)

foreach ($file in $changedFiles) {
    $fullPath = Join-Path $projectRoot $file
    if (Test-Path $fullPath) {
        Write-Host "      ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "      ✗ MISSING: $file" -ForegroundColor Red
    }
}

# Step 2: Git add + commit
Write-Host ""
Write-Host "[2/3] Staging and committing all changes..." -ForegroundColor Yellow
Set-Location $projectRoot

git add src/styles/design-system.css
git add src/components/game-renderer.js
git add src/components/ui-components.js
git add src/components/sidebar.js
git add src/data/lesson-01-cuba.js
git add Assets_Organized/L01_Cuba/events/

git commit -m "UI/UX upgrade: fix advisor portraits, add state system, event triggers

- Fix advisor portraits: 3:4 aspect ratio containers with object-fit cover
- Advisor state system: highlight dominant, dim others, reaction indicators
- Event trigger system: conditional events fire after decisions
- Event cards: sidebar cards + popup modals for triggered events
- Added 7 event assets to L01_Cuba/events/"

Write-Host "      Committed." -ForegroundColor Green

# Step 3: Push
Write-Host ""
Write-Host "[3/3] Pushing to GitHub..." -ForegroundColor Yellow
git push
Write-Host "      Pushed! Netlify will deploy in ~1-2 minutes." -ForegroundColor Green

Write-Host ""
Write-Host "=== UI/UX Upgrade Deployed! ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Changes applied:" -ForegroundColor White
Write-Host "  1. Advisor portraits: Fixed 3:4 containers, no more cropping" -ForegroundColor Gray
Write-Host "  2. Advisor state: Highlight/dim system with reaction indicators" -ForegroundColor Gray
Write-Host "  3. Event triggers: 7 conditional events for Lesson 1 Cuba" -ForegroundColor Gray
Write-Host "  4. Event cards: Sidebar cards + popup modals" -ForegroundColor Gray
Write-Host ""
Write-Host "Check empireandinfluence.netlify.app" -ForegroundColor Cyan
Write-Host ""

$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$outDir = (Resolve-Path "artifacts/visual-showcase").Path
$brainDir = "C:\Users\Vikas\.gemini\antigravity\brain\eb3822a9-e5c3-4387-afed-3d717d23f5a5\visual-showcase"

if (-not (Test-Path $brainDir)) {
    New-Item -ItemType Directory -Force -Path $brainDir | Out-Null
}

$routes = @(
    @{ Path = "/"; Name = "homepage" },
    @{ Path = "/features"; Name = "features" },
    @{ Path = "/how-it-works"; Name = "how-it-works" },
    @{ Path = "/no-show-report"; Name = "no-show-report" },
    @{ Path = "/pricing"; Name = "pricing" },
    @{ Path = "/security"; Name = "security" },
    @{ Path = "/about"; Name = "about" },
    @{ Path = "/contact"; Name = "contact" },
    @{ Path = "/demo"; Name = "demo" },
    @{ Path = "/login"; Name = "login" },
    @{ Path = "/signup"; Name = "signup" },
    @{ Path = "/onboarding/clinic"; Name = "onboarding" },
    @{ Path = "/app/dashboard"; Name = "dashboard" }
)

Write-Host "Beginning screenshot capture across 13 routes..."

$i = 0
foreach ($r in $routes) {
    $i++
    $url = "http://localhost:3001" + $r.Path
    Write-Host "[$i/13] Capturing $($r.Name) from $url..."

    # Desktop: 1440 x 1000
    $desktopFile = Join-Path $outDir "$($r.Name)-desktop.png"
    $userProfileD = "C:\tmp\cp-d-$i"
    Start-Process -FilePath $chrome -ArgumentList `
        "--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", `
        "--user-data-dir=$userProfileD", "--window-size=1440,1000", `
        "`"--screenshot=$desktopFile`"", $url -Wait
    Remove-Item -Recurse -Force $userProfileD -ErrorAction SilentlyContinue

    # Mobile: 390 x 844
    $mobileFile = Join-Path $outDir "$($r.Name)-mobile.png"
    $userProfileM = "C:\tmp\cp-m-$i"
    Start-Process -FilePath $chrome -ArgumentList `
        "--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", `
        "--user-data-dir=$userProfileM", "--window-size=390,844", `
        "`"--screenshot=$mobileFile`"", $url -Wait
    Remove-Item -Recurse -Force $userProfileM -ErrorAction SilentlyContinue

    # Copy to brain artifacts directory
    if (Test-Path $desktopFile) {
        Copy-Item -Path $desktopFile -Destination (Join-Path $brainDir "$($r.Name)-desktop.png") -Force
    }
    if (Test-Path $mobileFile) {
        Copy-Item -Path $mobileFile -Destination (Join-Path $brainDir "$($r.Name)-mobile.png") -Force
    }

    Write-Host "  -> Captured: $($r.Name)-desktop.png & $($r.Name)-mobile.png"
}

Write-Host "All 26 route screenshots captured successfully!"

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ARTIFACTS_DIR = path.resolve(__dirname, '../artifacts/visual-showcase');
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

// Create HTML Contact Sheet
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>ClinicDesk Visual Showcase Contact Sheet</title>
  <style>
    body {
      margin: 0;
      padding: 40px;
      background: #102B3B;
      color: #F5F7F4;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    header {
      text-align: center;
      margin-bottom: 40px;
    }
    h1 {
      font-size: 36px;
      margin: 0 0 10px 0;
      color: #18B7A4;
    }
    p {
      color: #E6ECE9;
      font-size: 16px;
      margin: 0;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      max-width: 1800px;
      margin: 0 auto;
    }
    .card {
      background: #1A3848;
      border: 1px solid #2A4D60;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    .card-header {
      padding: 12px 16px;
      background: #153242;
      border-bottom: 1px solid #2A4D60;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .card-title {
      font-size: 14px;
      font-weight: 600;
      color: #F5F7F4;
    }
    .card-badge {
      font-size: 11px;
      font-family: monospace;
      background: #102B3B;
      color: #18B7A4;
      padding: 2px 8px;
      border-radius: 4px;
      border: 1px solid #18B7A4;
    }
    .card-body img {
      width: 100%;
      height: 280px;
      object-fit: cover;
      object-position: top;
      display: block;
    }
  </style>
</head>
<body>
  <header>
    <h1>ClinicDesk — Production Visual Contact Sheet</h1>
    <p>Live Headless Chrome rendering audit across 13 core application & marketing routes</p>
  </header>
  <div class="grid">
    <div class="card">
      <div class="card-header"><span class="card-title">Homepage</span><span class="card-badge">/</span></div>
      <div class="card-body"><img src="homepage-desktop.png" /></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title">Outpatient Dashboard</span><span class="card-badge">/app/dashboard</span></div>
      <div class="card-body"><img src="dashboard-desktop.png" /></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title">No-Show Intelligence</span><span class="card-badge">/no-show-report</span></div>
      <div class="card-body"><img src="no-show-report-desktop.png" /></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title">Product Capabilities</span><span class="card-badge">/features</span></div>
      <div class="card-body"><img src="features-desktop.png" /></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title">Pricing & ROI Calculator</span><span class="card-badge">/pricing</span></div>
      <div class="card-body"><img src="pricing-desktop.png" /></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title">Security & RLS Specs</span><span class="card-badge">/security</span></div>
      <div class="card-body"><img src="security-desktop.png" /></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title">Interactive Demo Sandbox</span><span class="card-badge">/demo</span></div>
      <div class="card-body"><img src="demo-desktop.png" /></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title">Doctor Portal Sign In</span><span class="card-badge">/login</span></div>
      <div class="card-body"><img src="login-desktop.png" /></div>
    </div>
    <div class="card">
      <div class="card-header"><span class="card-title">Clinic Onboarding Wizard</span><span class="card-badge">/onboarding/clinic</span></div>
      <div class="card-body"><img src="onboarding-desktop.png" /></div>
    </div>
  </div>
</body>
</html>
`;

const contactSheetHtml = path.join(ARTIFACTS_DIR, 'contact-sheet.html');
fs.writeFileSync(contactSheetHtml, htmlContent);

console.log('Generating contact sheet rendering...');
const outPng = path.join(ARTIFACTS_DIR, 'contact-sheet.png');
const brainDir = "C:\\Users\\Vikas\\.gemini\\antigravity\\brain\\eb3822a9-e5c3-4387-afed-3d717d23f5a5\\visual-showcase";

const fileUrl = 'file:///' + contactSheetHtml.replace(/\\\\/g, '/');

spawnSync(CHROME_PATH, [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--hide-scrollbars',
  '--user-data-dir=C:\\tmp\\cp-cs',
  '--window-size=1800,1200',
  `--screenshot=${outPng}`,
  fileUrl
], { timeout: 30000 });

if (fs.existsSync(outPng)) {
  fs.copyFileSync(outPng, path.join(brainDir, 'contact-sheet.png'));
  console.log('Contact sheet rendered successfully:', outPng);
} else {
  console.error('Failed to create contact sheet PNG');
}

const http = require('http');
const fs = require('fs');
const path = require('path');

const ARTIFACTS_DIR = path.resolve(__dirname, '../artifacts/visual-showcase');
const tokens = JSON.parse(fs.readFileSync(path.join(ARTIFACTS_DIR, 'tokens.json'), 'utf8'));

const proxy = http.createServer((req, res) => {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: 'localhost:3000' }
  };

  if (req.url.startsWith('/app')) {
    options.headers['cookie'] = `clinicdesk_session=${tokens.dashboardToken}`;
  } else if (req.url.startsWith('/onboarding')) {
    options.headers['cookie'] = `clinicdesk_session=${tokens.onboardingToken}`;
  }

  const clientReq = http.request(options, (clientRes) => {
    res.writeHead(clientRes.statusCode, clientRes.headers);
    clientRes.pipe(res, { end: true });
  });

  req.pipe(clientReq, { end: true });
});

proxy.listen(3001, () => {
  console.log('Auth proxy listening on port 3001');
});

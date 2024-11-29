const http = require('http');

// Function to modify the RUT
function modifyRUT(rut) {
  return `${rut}-modified`; // Replace with your custom logic
}

// Create an HTTP server
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/rut') {
    let body = '';

    // Collect the data from the request
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // Process the data once fully received
    req.on('end', () => {
      try {
        const { RUT } = JSON.parse(body);

        if (!RUT || typeof RUT !== 'string') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Invalid RUT provided' }));
        }

        const newRUT = modifyRUT(RUT);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ newRUT }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
  } 
  else if (req.method === 'GET' && req.url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;
    res.end('<html><body><h1>Home is working!</h1></body></html>');
  }
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

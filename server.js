export default function handler(req, res) {
    // Handle POST request for /rut
    if (req.method === 'POST' && req.url === '/rut_home') {
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
            res.status(400).json({ error: 'Invalid RUT provided' });
            return;
          }
  
          const newRUT = modifyRUT(RUT);
  
          res.status(200).json({ newRUT });
        } catch (err) {
          res.status(400).json({ error: 'Invalid JSON payload' });
        }
      });
    }
    // Handle GET request to '/'
    else if (req.method === 'GET' && req.url === '/') {
      res.setHeader('Content-Type', 'text/html');
      res.status(200).end('<html><body><h1>Home is working!</h1></body></html>');
    } 
    // Handle any other routes or methods
    else {
      res.status(404).json({ error: 'Not Found' });
    }
  }
  
  // Function to modify the RUT
  function modifyRUT(rut) {
    return `${rut}-modified`; // Replace with your custom logic
  }
  
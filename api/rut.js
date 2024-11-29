export default async function handler(req, res) {
  if (req.method === 'POST') {
    let body = '';

    // Collect data from the request body
    req.on('data', chunk => {
      body += chunk.toString();
    });

    // Process the data once fully received
    req.on('end', () => {
      try {
        const { RUT } = JSON.parse(body);

        if (!RUT || typeof RUT !== 'string') {
          return res.status(400).json({ error: 'Invalid RUT provided' });
        }

        // Modify the RUT (replace with your custom logic)
        const newRUT = `${RUT}-modified`;

        return res.status(200).json({ newRUT });
      } catch (err) {
        return res.status(400).json({ error: 'Invalid JSON payload' });
      }
    });
  } else {
    res.status(404).json({ error: 'Not Found' });
  }
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { RUT } = req.body;

      if (!RUT || typeof RUT !== 'string') {
        return res.status(400).json({ error: 'Invalid RUT provided' });
      }

      // Modify the RUT (replace with your custom logic)
      const newRUT = `${RUT}-modified`;

      return res.status(200).json({ newRUT });
    } catch (err) {
      return res.status(400).json({ error: 'Invalid JSON payload' });
    }
  } else {
    return res.status(404).json({ error: 'Not Found' });
  }
}
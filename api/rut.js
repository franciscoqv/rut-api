export default function handler(req, res) {
    if (req.method === 'POST') {
      const { RUT } = req.body;
  
      if (!RUT || typeof RUT !== 'string') {
        return res.status(400).json({ error: 'Invalid RUT provided' });
      }
  
      const newRUT = modifyRUT(RUT);
      return res.status(200).json({ newRUT });
    }
  
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
  
function modifyRUT(rut) {
    return `${rut}-modified`; // Example modification
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { RUT } = req.body[0];
      const { type } = req.body[1];

      if (!RUT || typeof RUT !== 'string') {
        return res.status(400).json({ error: 'Invalid RUT provided' });
      }

      // Delete points and dashes from the RUT
      const cleanedRUT = RUT.replace(/[.-]/g, '');

      const formattedRUT = '';
      // Modify the RUT
      if (type == 1){
        formattedRUT = cleanedRUT.slice(0, -1) + '-' + cleanedRUT.slice(-1);
      }
      else if (type == 2){
        if (input.length === 9) {
          formattedRUT = input.slice(0, 8) + '-' + input.slice(8);
        }
        else if (input.length === 8) {
          formattedRUT = input.slice(0, 1) + '.' + input.slice(1, 4) + '.' + input.slice(4, 7) + '-' + input.slice(7);
        }
      }
      else if (type == 3){
        formattedRUT = cleanedRUT;
      }
      else { //type 4
        formattedRUT = cleanedRUT.slice(0, -1);
      }

      return res.status(200).json({ formattedRUT });
    } catch (err) {
      // Return a detailed error response
      return res.status(400).json({
        error: 'Invalid JSON payload',
        message: err.message,  // Include the error message
        stack: err.stack,      // Optionally include the stack trace (helpful during development)
        timestamp: new Date().toISOString(), // Include the timestamp for the error
      });
    }
  } else {
    return res.status(404).json({ error: 'Not Found' });
  }
}


//Type 1: 17176334-7
//Type 2: 17.176.334-7
//Type 3: 171763347
//Type 4: 17176334
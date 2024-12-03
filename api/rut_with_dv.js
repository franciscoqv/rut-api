export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { RUT, type } = req.body;

      if (!RUT || typeof RUT !== 'string') {
        return res.status(400).json({ error: 'Invalid RUT provided' });
      }

      // Delete points and dashes from the RUT
      const cleanedRUT = RUT.replace(/[.-]/g, '');

      // Delete prefixed zeros (e.g., 0028393044 --> 28393044)
      cleanedRUT = Number(cleanedRUT.slice(0, -1)).toString() + cleanedRUT.slice(-1);

      var formattedRUT = '';
      // Modify the RUT
      if (type == 1){
        formattedRUT = cleanedRUT.slice(0, -1) + '-' + cleanedRUT.slice(-1);
      }
      else if (type == 2){
        if (cleanedRUT.length === 9) {
          formattedRUT = cleanedRUT.slice(0, 2) + '.' + cleanedRUT.slice(2, 5) + '.' + cleanedRUT.slice(5, 8) + '-' + cleanedRUT.slice(8);
        }
        else if (input.length === 8) {
          formattedRUT = cleanedRUT.slice(0, 1) + '.' + cleanedRUT.slice(1, 4) + '.' + cleanedRUT.slice(4, 7) + '-' + cleanedRUT.slice(7);
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


//Type 1: 12345678-9
//Type 2: 12.345.678-9
//Type 3: 123456789
//Type 4: 12345678
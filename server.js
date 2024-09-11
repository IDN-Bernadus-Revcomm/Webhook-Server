const express = require('express');
const fs = require('fs'); 
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

// Function to write incoming payload to log file
const logPayload = (payload) => {
  const logData = `Timestamp: ${new Date().toISOString()}\nPayload: ${JSON.stringify(payload, null, 2)}\n\n`;
  
  // Append the log data to the log file (or create one if it doesn't exist)
  /*fs.appendFileSync('webhook_payload.log', logData, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });*/

  // Log the payload directly to the console for Render logs
  console.log(logData);
};

// Webhook route
app.post('/webhook', (req, res) => {
  const challenge = req.body.challenge; // Extract the challenge token
  const jsonData = req.body;

  // Check if challenge exists
  if (challenge) {
    // Return the challenge as plain text with correct headers
    return res.status(200).header('Content-Type', 'text/plain').send(challenge);
  }

  try {
    // Log the incoming payload
    logPayload(jsonData);
  } catch (err) {
        console.error('Error processing the request:', err);
        res.status(500).send('Error writing data to Excel or log');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Webhook receiver is listening on port 3000');
});
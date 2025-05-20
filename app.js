require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const menuHandler = require('./utils/menuHandler');
const { testConnection } = require('./utils/dbConfig');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test database connection on startup
(async () => {
  await testConnection();
})();

// USSD endpoint
app.post('/ussd', (req, res) => {
  const {
    sessionId,
    serviceCode,
    phoneNumber,
    text
  } = req.body;

  let response = '';

  // Process the USSD request
  menuHandler.handleMenu(sessionId, text, phoneNumber)
    .then(result => {
      // Format response based on whether session should end
      response = `${result.endSession ? 'END' : 'CON'} ${result.response}`;
      res.send(response);
    })
    .catch(error => {
      console.error('Error handling USSD request:', error);
      response = 'END An error occurred. Please try again later.';
      res.send(response);
    });
});

// Clean up expired sessions every hour
setInterval(() => {
  menuHandler.cleanupSessions();
}, 60 * 60 * 1000);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
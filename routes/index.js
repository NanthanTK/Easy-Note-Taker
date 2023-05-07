const express = require('express');

// Import our modular routers for /tips and /feedback
//const tipsRouter = require('./tips');
//const feedbackRouter = require('./feedback');
//const diagnosticsRouter = require('./diagnostics');

const app = express();

api.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

//app.use('/tips', tipsRouter);
//app.use('/feedback', feedbackRouter);
//app.use('/diagnostics', diagnosticsRouter);

module.exports = app;
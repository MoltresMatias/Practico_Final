
const serverless = require('serverless-http');
const app = require('../app'); // reutilizás tu app.js

module.exports = serverless(app);
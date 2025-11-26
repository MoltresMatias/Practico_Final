/*
const http = require('http');
const app = require('./app');
const port = 3000;
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('API funcionando en Vercel 🚀');
});

app.get('/ping', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date() });
});


const server = http.createServer(app);
server.listen(port);

module.exports = app;
*/


const serverless = require('serverless-http');
const app = require('./app');


module.exports = serverless(app);
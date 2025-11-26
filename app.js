/*
const express = require('express');
//const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser');

const pg = require('pg');

const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');

const app = express();

// Middleware para parsear JSON y formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));


app.use("/posts", postsRoute)
app.use("/user", userRoute);

app.get('/', (req, res) => {
    res.send('API funcionando en Vercel 🚀');
});


app.post('/ping', (req, res) => {
    res.json({ status: 'ok', body: req.body });
});



module.exports = app;
*/
const express = require('express');
const pg = require('pg');
const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');

const app = express();

app.use(express.json({ limit: '10mb' }));

app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use("/posts", postsRoute)
app.use("/user", userRoute);

app.get('/', (req, res) => {
    res.send('API funcionando en Vercel 🚀');
});


app.post('/ping', (req, res) => {
    res.json({ status: 'ok', body: req.body });
});


module.exports = app;
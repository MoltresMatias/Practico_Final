const express = require('express');
//const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser');

const pg = require('pg');

// Middleware para parsear JSON y formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const app = express();

const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/posts", postsRoute)
app.use("/user", userRoute);

app.get('/', (req, res) => {
    res.send('API funcionando en Vercel 🚀');
});


app.post('/ping', (req, res) => {
    res.json({ status: 'ok', body: req.body });
});



module.exports = app;
const express = require('express');
const PORT = process.env.PORT || 3000



const app = express();

const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/posts", postsRoute)
app.use("/user", userRoute);



module.exports = app;
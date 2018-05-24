const express = require('express');
const app = express();
const User = require('./models/user.model');
// const parser = require('body-parser').urlencoded({extended: false});
const parser = require('body-parser').json();

app.post('/signup',parser, (req,res) => {
    const { email, password, name, phone} = req.body;
    User.signUp(email, password, name, phone)
    .then(user => res.send({ success: true, user}) )
    .catch(error => res.send({ success: false, message: error.message}) );
});

module.exports = app;

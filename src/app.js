const express = require('express');
const app = express();
const User = require('./models/user.model');
// const parser = require('body-parser').urlencoded({extended: false});
const parser = require('body-parser').json();
const { sign, verify} = requie('./lib/jwt.js');

app.post('/signup',parser, (req,res) => {
    const { email, password, name, phone} = req.body;
    User.signUp(email, password, name, phone)
    .then(user => res.send({ success: true, user}) )
    .catch(error => res.status(error.statusCode).send({ success: false, message: error.message, code: error.code}) );
});

app.post('/signin',parser, (req,res) => {
    const { email, password} = req.body;
    User.signIn(email, password)
    .then(user => res.send({ success: true, user}) )
    .catch(error => res.status(error.statusCode).send({ success: false, message: error.message, code: error.code}) );
});

function mustBeUser(req,res,next) {
    const {token} = req.headers;
    if (!token) return res.status(400).send({ success: false, message: " Invalid token"});
    verify(token)
    .then(obj => {
        req.idUser = obj._id;
        next();
    })
    .catch( () => res.status(400).send({ success: false, message: " Invalid token"}) );
}

app.post('/story', mustBeUser, (req,res) => {

});

app.delete('/story/id',  mustBeUser, (req,res) => {

});

module.exports = app;

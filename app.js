require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//import models
const Photos = require('./models/photos');


// imports routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors())


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


// DB connection

const connect = mongoose.connect( `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@photo-catalog-cluster-btgtl.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });


module.exports = app;

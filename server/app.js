var express = require('express');
var app = express();
var db = require('./db');
var morgan = require('morgan')
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static('public'));
app.get('/',(res,req)=>{res.send("hello")});
const ProductController = require('./products/product.controller');
app.use('/products', ProductController);


module.exports = app;
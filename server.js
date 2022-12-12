const express = require('express')
const dotenv = require('dotenv').config()
const path = require('path')
const routes = require('./routes')
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use(express.static(path.join(__dirname, 'views')))

app.listen(port)

app.use('/', routes)

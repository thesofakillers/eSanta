//main file

//<section>~~~~~~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
//</section> End of Imports


const app = express();

// for parsing POSTed JSON
app.use(bodyParser.json());
// for parsing parameters passed in URL
app.use(bodyParser.urlencoded({extended: false}));
// utilize routes.js for handling routes
app.use('/', routes);
// specify where static files are
app.use(express.static('public'));

// export app for other scripts to utilize
module.exports = app;

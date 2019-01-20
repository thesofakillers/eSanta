//main file

//<section>~~~~~~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
//</section> End of Imports


const app = express();

// for parsing POSTed JSON
app.use(bodyParser.json());
// utilize routes.js for handling routes
app.use('/', routes);
// specify where static files are
app.use(express.static('public'));

// export app for other scripts to utilize
export default app;

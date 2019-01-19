//main file

//<section>~~~~~~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
//</section> End of Imports


const app = express();

app.use(bodyParser.json());

app.use('/', routes);

export default app;

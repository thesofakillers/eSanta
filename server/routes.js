// file for handling routes

//<section>~~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import express from 'express'
import basicController from './controllers/basicController'
//</section> End of imports

const routes = express();

routes.get('/', basicController.get);

export default routes;

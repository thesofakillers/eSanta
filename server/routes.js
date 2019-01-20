// file for handling routes

//<section>~~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { Router } from 'express'
import basicController from './controllers/basicController'
import peopleController from './controllers/peopleController'
//</section> End of imports

const routes = Router();

routes.get('/', basicController.getHome);
routes.get('/people', peopleController.getPeople);
routes.get('/people/:username', peopleController.getPerson);
routes.post('/people', peopleController.postPerson);

export default routes;

// file for handling routes

//<section>~~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { Router } from 'express'
import basicController from './controllers/basicController'
import peopleController from './controllers/peopleController'
import wishlistController from './controllers/wishlistController'
//</section> End of imports

const routes = Router();

routes.get('/', basicController.getHome);

routes.get('/people', peopleController.getPeople);
routes.get('/people/:username', peopleController.getPerson);
routes.post('/people', peopleController.postPerson);

routes.post('/wishlists', wishlistController.getWishlists);
routes.get('/wishlists/:username', wishlistController.getWishlist);


export default routes;

// file for handling routes

//<section>~~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import basicController from './controllers/basicController';
import peopleController from './controllers/peopleController';
import wishlistController from './controllers/wishlistController';
import registerController from './controllers/registerController';
import loginController from './controllers/loginController';
//</section> End of imports

const routes = Router();

routes.get('/', basicController.getHome);

routes.get('/people', peopleController.getPeople);
routes.get('/people/:username', peopleController.getPerson);
routes.post('/people', peopleController.postPerson);

routes.get('/wishlists', wishlistController.getWishlists);
routes.get('/wishlists/:username', wishlistController.getWishlist);

routes.post('/register', registerController.register);

routes.post('/login', loginController.login);

export default routes;

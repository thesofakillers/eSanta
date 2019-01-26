// file for handling routes

//<section>~~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const Router =require('express');
const jwt = require('jsonwebtoken');
const basicController = require('./controllers/basicController');
const peopleController = require('./controllers/peopleController');
const wishlistController = require('./controllers/wishlistController');
const registerController = require('./controllers/registerController');
const loginController = require('./controllers/loginController');
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

module.exports = routes;

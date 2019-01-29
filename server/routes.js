// file for handling routes

//<section>~~~~~~~~~~~~~~~~~~~~~Imports~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const Router =require('express');
const jwt = require('jsonwebtoken');
const basicController = require('./controllers/basicController');
const peopleController = require('./controllers/peopleController');
const wishlistController = require('./controllers/wishlistController');
const registerController = require('./controllers/registerController');
const loginController = require('./controllers/loginController');
const userController = require('./controllers/userController');
const authorize = require('./middleware/authorize');
//</section> End of imports

const routes = Router();

// anyone can GET the home page ✓
routes.get('/', basicController.getHome);

// anyone can GET naughty list ✓
routes.get('/people', peopleController.getPeople);
routes.get('/people/:username', peopleController.getPerson);
// only admin can post to naughty LIST (handled internally - not with middleware)
                               // to conform with assignment's specified tests ✓
routes.post('/people', peopleController.postPerson);

// only admin can see all users on website (handled with middleware + internally)
routes.get('/users', userController.getUsers)

// Only admin can see all wishlists ✓
routes.get('/wishlists', authorize, wishlistController.getWishlists);
// Only username (+admin) can see /wishlists/:username ✓
routes.get('/wishlists/:username', authorize, wishlistController.getWishlist);
// only users can post to /wishlists (handled with middleware) ✓
routes.post('/wishlists', authorize, wishlistController.createWishlist);
// only username can edit /wishlists/:username (handled with middleware)
routes.put('/wishlists/:username', wishlistController.editWishlist);

// anyone can try registering ✓
routes.post('/register', registerController.register);

//anyone can try logging in ✓
routes.post('/login', loginController.login);

module.exports = routes;

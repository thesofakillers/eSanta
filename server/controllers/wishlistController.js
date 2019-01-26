const wishlists = require('./../models/wishlists');
const utils = require('./../utils');

const wishlistController = {};


/*
controller which returns the JSON array of wishlists registered on the website
*/
wishlistController.getWishlists = (req, res) => {
  return res.status(200).send(wishlists);
};


/*
controller which returns the JSON object (wishlist) within the wishlists array
corresponding to the username requested
*/
wishlistController.getWishlist = (req, res) => {
  // parse requested username from RESTful interaction
  const usernameRequested = req.params.username;
  // get usernames of all those with a wishlist
  let usernames = utils.getAttributeList(wishlists, 'username');
  // get index of JSON object corresponding to the username
  let index = usernames.indexOf(usernameRequested);
  // check if the user has a wishlist
  if (index != -1) { // if it does
    // status OK  + send user wishlist
    return res.status(200).send(wishlists[index]);
  } else { // if it doesn't
    // Status server error
    return res.status(400).send();
  };
};

module.exports = wishlistController;

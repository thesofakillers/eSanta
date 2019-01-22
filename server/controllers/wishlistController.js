import wishlists from './../models/wishlists';
import utils from './../utils'

const wishlistController = {};


/*
controller which returns the JSON array of wishlists registered on the website
*/
wishlistController.getWishlists = (req, res) => {
  res.status(200);
  res.send(wishlists);
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
    res.status(200) // status OK
    res.send(wishlists[index]); // send the user's wishlist
  } else { // if it doesn't
    res.status(400).send();
  }
};

export default wishlistController;

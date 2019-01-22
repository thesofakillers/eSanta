const wishlistController = {};

import wishlists from './../models/wishlists';


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
  // get index of JSON object corresponding to the username
  var index = wishlists.map(function(d) {
    return d['username'];
  }).indexOf(usernameRequested);
  // check if the user has a wishlist
  if (index != -1) { // if it does
    res.status(200) // status OK
    res.send(wishlists[index]); // send the user's wishlist
  } else { // if it doesn't
    res.status(400).send();
  }
};

export default wishlistController;

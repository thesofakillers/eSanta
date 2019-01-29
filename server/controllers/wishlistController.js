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

/*
controller which creates a new wishlist for a specific user
*/
wishlistController.createWishlist = (req, res) => {
  // identify who is trying to create a new wishlist
  const submittingUser = req.jwt.username;
  // check that they don't already have a wishlist
  let index = utils.getAttributeList(wishlists, 'username').indexOf(submittingUser);
  if (indexPeople >= 0) { // if this user already has a wishlist
    //prevent the addition of this user to /people
    return res.status(400).send({message:"You already have a wishlist"});
  } else { // if the user does not have a wishlist
    // read wishlist sent in from client
    const submittedWishes = req.body.wishes; // should be list of strings
    // add wishlist to database
    wishlists.push({
      'username': submittingUser,
      'wishes': submittedWishes
    });
    // let user know of success
    return res.status(200).send({message: "Wishlist created"});
  };
};

/*
controller which edits an existing wishlist for a specific user
*/
wishlistController.editWishlist = (req, res) => {
  return res.status(200).send("TO DO");
};

module.exports = wishlistController;

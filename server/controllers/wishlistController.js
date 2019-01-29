const wishlists = require('./../models/wishlists');
const utils = require('./../utils');

const wishlistController = {};


/*
controller which returns the JSON array of wishlists registered on the website
only accessible to admin
*/
wishlistController.getWishlists = (req, res) => {
  // get accessing user's admin status
  const userAdmin = req.jwt.access_token;
  // check the status
  if (userAdmin !== 'concertina'){// if they are not an admin
    // let them know that they are not authorized to see this
    return res.status(403).send({message: "You are not authorized"})
  } else { // if they are an admin
    // return OK and the wishlists JSON
    return res.status(200).send(wishlists);
  };
};


/*
controller which returns the JSON object (wishlist) within the wishlists array
corresponding to the username requested
only accessible by admin or by user if they are requesting their own wishlist
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

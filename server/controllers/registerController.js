const registerController = {};

const people = require('./../models/people');
const users = require('./../models/users');
const utils = require('./../utils');
const bcrypt = require('bcrypt');
/*
controller which returns the JSON array of wishlists registered on the website
*/
registerController.register = (req, res) => {
  // get data from request body
  const usernameSubmitted = req.body.username;

  /*
  Check if username is taken -- this needs to be checked against
  -users: since this is where a newly registered user will be added to
  -people:  Because elves have the freedom to add *any* username to /people,
            regardless of whether it exists in /users, there is the possibility
            that the username not taken in /users exists in /people - This will
            cause duplicate issues if the elves decide that they want to place
            the newly registered user in /people.

  We first check whether it is duplicate in /users, since this set should be
  larger. Iff the check passes, then we also check in /people, for the elusive
  case described above
  */
  // checking if username is taken in /users.
  let indexUsers = utils.getAttributeList(users, 'username').indexOf(usernameSubmitted);
  if (indexUsers >= 0) { // if it's taken
    //prevent the creation of this user
    return res.status(400).send();
  } else { // if it's not taken in /users
    // move on and check if username is taken in /people
    let indexPeople = utils.getAttributeList(people, 'username').indexOf(usernameSubmitted);
    if (indexPeople >= 0) { // if it's taken here
      //prevent the creation of this user
      return res.status(400).send();
    } else {
      // encrypt password
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        // catch errors
        if (err) {
          return res.status(500).json({
            error: err
          });
        } else { // in case of no errors
          // assign hashed password to a constant
          const passwordSubmitted = hash;
          // get remaining user attributes
          const forenameSubmitted = req.body.forename;
          const surnameSubmitted = req.body.surname;
          const adminSubmitted = req.body.access_token;
          // create and add newly registered user to users
          users.push({
            'username': usernameSubmitted,
            'forename': forenameSubmitted,
            'surname': surnameSubmitted,
            'password': passwordSubmitted,
            'access_token': adminSubmitted
          });
          // send OK response to Client
          return res.status(200).send({
            message : 'Successfully Registered'
          });
        }
      });
    };
  };
};


module.exports = registerController;

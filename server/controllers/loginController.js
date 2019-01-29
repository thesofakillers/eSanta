const bcrypt = require('bcrypt');
const users = require('./../models/users');
const utils = require('./../utils');
const jwt = require('jsonwebtoken')

const loginController = {};

/*
controller which handles logging in - returns JWT upon success
*/
loginController.login = (req, res) => {
  // get data from request body
  const usernameSubmitted = req.body.username;

  // finding submitted username in users
  let indexUsers = utils.getAttributeList(users, 'username').indexOf(usernameSubmitted);

  // if the username exists
  if (indexUsers >= 0) {
    // get the JSON corresponding to the user which is attempting login
    loginUser = users[indexUsers];
    // compare the submitted password to that in the database
    bcrypt.compare(req.body.password, loginUser.password, (err, result) => {
      if (err) {
        // if an error occurs
        return res.status(400).send({
          message: "Authentication failed"
        });
      } else if (result) {
        // if the comparison is succesful (passwords match)
        // create JWT
        const token = jwt.sign(
          {//payload
            username: loginUser.username,
            access_token: loginUser.access_token
          },
          process.env.JWT_KEY, //key
          { //options
            expiresIn: "1h",
          });
        // send success message and token to client
        return res.status(200).send({
          message: "Authentication Successful",
          token: token
        });
      } else {
        // if the passwords don't match
        return res.status(400).send({
          message: "Authentication failed"
        });
      };
    })
  } else {
    // if the username doesn't exist
    return res.status(400).send({
      message: "Authentication failed"
    });
  }
};


module.exports = loginController;

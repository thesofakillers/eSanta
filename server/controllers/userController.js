const users = require('./../models/users');

const userController = {};

userController.getUsers = (req, res) => {
  // check whether requesting user is an admin
  if (req.jwt.access_token === 'concertina') { //if they are
    // get users DB but without passwords
    passwordlessUsers = users.map( e => ({
        username: e.username,
        forename: e.forename,
        surname: e.surname,
        access_token: e.access_token
    }));
    // then respond with OK and the users JSON (without passwords)
    return res.status(200).send(passwordlessUsers);
  } else { // if they are not admin
    // tell them they are not authorized
    return res.status(403).send({
      message: "You are not authorized"
    })
  };
};

module.exports = userController;

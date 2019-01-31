const jwt = require('jsonwebtoken');
const users = require('./../models/users');
const utils = require('./../utils');

module.exports = (req, res, next) => {
  // try/catch block tries to verify token, handling failure to do so
  try {
    // parse the token from the headers
    const receivedToken = req.headers.authorization.split(" ")[1];
    // try to verify token
    const verifiedToken = jwt.verify(receivedToken, process.env.JWT_KEY);
    // check whether user possessing token exists (if for example DB was reset)
    let indexUsers = utils.getAttributeList(users, 'username').indexOf(verifiedToken.username);
    // if they do (DB wasnt reset)
    if (indexUsers >= 0) {
      // set a custom request attribute corresponding to the token
      req.jwt = verifiedToken;
      // tell express to move on to the next function
      next();
    } else {
      return res.status(403).send({message: 'Authorization Failed'})
    };

  } catch (error) { // error raised when token is invalid
    return res.status(403).send({message: 'Authorization Failed'})
  }
}

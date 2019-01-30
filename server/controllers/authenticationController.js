const authenticationController = {};

authenticationController.check = (req, res) => {
  // if the user has made it this far, then his JWT is valid and contains
  // all the info they need
  return res.status(200).send({
    message: "You are authenticated"
  })
};

module.exports = authenticationController;

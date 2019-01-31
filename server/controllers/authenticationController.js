const authenticationController = {};

authenticationController.check = (req, res) => {
  // if the user has made it this far then they are authenticated
  return res.status(200).send({
    message: "You are authenticated"
  });
};

module.exports = authenticationController;

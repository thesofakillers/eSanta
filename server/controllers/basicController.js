const basicController = {};

basicController.getHome = (req, res) => {
  return res.sendFile('index.html', {root: 'public/'})
};

module.exports = basicController;

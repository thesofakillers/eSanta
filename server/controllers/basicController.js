const basicController = {};

basicController.getHome = (req, res) => {
  res.sendFile('index.html', {root: 'public/'})
};

export default basicController

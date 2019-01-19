const basicController = {};

basicController.get = (req, res) => {
  res.json({
    message: 'test'
  });
};

export default basicController

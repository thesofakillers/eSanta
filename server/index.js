// entry point file

const app = require('./app');

app.listen(3000 || 5000, () => {
  console.log("Running on port 3000...");
});

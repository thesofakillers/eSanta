// entry point file

const app = require('./app');

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), () => {
  console.log('Node server is running on port ' + app.get('port'));
});

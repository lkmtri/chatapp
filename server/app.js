import express from 'express';
import expressHbs from 'express-handlebars';

const app = express();

app.engine('hbs', expressHbs({
  extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use('/', express.static('./dist'));

app.get('/', (req, res) => {
  res.render(__dirname + '/template/index');
});

app.listen(3000, () => {
  console.log('Listening on port: 3000');
});

//https://developer.nytimes.com/
//https://developer.nytimes.com/docs/books-product/1/overview
//https://any-api.com/nytimes_com/books_api/docs/API_Description
require('dotenv').config({ path: `${__dirname}/.env` });
console.log(process.env.API_TOKEN)
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home', { pageTitle: 'Home'});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

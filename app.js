require('dotenv').config({ path: `${__dirname}/.env` });

const nytAPI = require(`${__dirname}/public/js/nytAPI.js`);

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Home page, this will show a list of best selling books
app.get('/', (req, res) => {
  const promiseToGetBooks = new Promise((resolve, reject) => {
    const pageContent = nytAPI.getBestSellers();
    setTimeout(() => {
      resolve(pageContent);
    }, 1000);
  });

  promiseToGetBooks.then((data) => {
    res.render('home', data);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

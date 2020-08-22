require('dotenv').config({ path: `${__dirname}/.env` });

const nytAPI = require(`${__dirname}/public/js/nytAPI.js`); // Import API functions

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let listNames;
nytAPI.gln((data) => {
  listNames = data; // Get a list of valid book list names
});

app.get('/', (req, res) => {
  // Promise utilised to allow enough time for data to be returned before rendering page
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

app.get('/a', (req, res) => {
  console.log(listNames);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

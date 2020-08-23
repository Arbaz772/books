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
nytAPI.getListNames((data) => {
  listNames = data; // Get a list of valid book list names
});

app.get('/', (req, res) => {
  const selectedListNameId = 23;
  nytAPI.getBestSellers(listNames[selectedListNameId].list_name_encoded, (data) => {
    const content = data;
    content.pageTitle = listNames[selectedListNameId].display_name;
    res.render('home', content);
  });
});

app.get('/a', (req, res) => {
  console.log(listNames);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

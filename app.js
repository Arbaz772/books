require('dotenv').config({ path: `${__dirname}/.env` });

const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  let url = 'https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=';
  url += process.env.API_TOKEN;

  https.get(url, (response) => {
    response.on('data', (data) => {
      const bookData = JSON.parse(data);

      res.render('home', { pageTitle: 'Home', numberOfResults: bookData.num_results });
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

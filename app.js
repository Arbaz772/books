require('dotenv').config({ path: `${__dirname}/.env` });

const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Home page, this will show a list of best selling books
app.get('/', (req, res) => {
  let url = 'https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=';
  url += process.env.API_TOKEN;

  https.get(url, (response) => {
    response.on('data', (data) => {
      const bookData = JSON.parse(data);
      const numOfResults = bookData.num_results; // Get the number of books returned in API call
      let books = [];

      let i;
      for (i = 0; i < numOfResults; i += 1) {
        const book = {
          name: bookData.results[i].book_details[0].title,
          description: bookData.results[i].book_details[0].description,
          author: bookData.results[i].book_details[0].author,
          amazonProductUrl: bookData.results[i].amazon_product_url,
          rank: bookData.results[i].rank,
          rankLastWeek: bookData.results[i].rank_last_week,
        };

        books.push(book);
      }
      res.render('home', { pageTitle: 'Home', books: books });
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

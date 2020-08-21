require('dotenv').config({ path: `${__dirname}/.env` });
const https = require('https');

exports.getListNames = () => {
  let url = 'https://api.nytimes.com/svc/books/v3/lists/names.json?api-key='
  url += process.env.API_KEY;

  let listNames = [];

  https.get(url, (response) => {
    response.on('data', (data) => {
      const listNamesData = JSON.parse(data);
      listNames = listNamesData.results;
    });
  });
  return listNames;
};

exports.getBestSellers = () => {
  let url = 'https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=';
  url += process.env.API_KEY;

  const books = [];

  https.get(url, (response) => {
    response.on('data', (data) => {
      const bookData = JSON.parse(data);
      const numOfResults = bookData.num_results;
      let i;
      for (i = 0; i < numOfResults; i += 1) {
        // Assign some key book info to an object
        const book = {
          name: bookData.results[i].book_details[0].title,
          description: bookData.results[i].book_details[0].description,
          author: bookData.results[i].book_details[0].author,
          amazonProductUrl: bookData.results[i].amazon_product_url,
          rank: bookData.results[i].rank,
          rankLastWeek: bookData.results[i].rank_last_week,
          ISBN13: bookData.results[i].book_details[0].primary_isbn13,
        };

        // Work out which direction the book has moved in the charts, i.e. up down same or new entry
        let rankIcon;
        if (book.rankLastWeek === 0) {
          book.rankIcon = '(new)';
        } else if (book.rank > book.rankLastWeek) {
          book.rankIcon = '⇧';
        } else if (book.rank === book.rankLastWeek) {
          book.rankIcon = '-';
        } else if (book.rank < book.rankLastWeek) {
          book.rankIcon = '⇩';
        } else {
          book.rankIcon = '(new)';
        }

        books.push(book);
      }
    });
  });
  return { pageTitle: 'Hardcover Fiction', books };
};

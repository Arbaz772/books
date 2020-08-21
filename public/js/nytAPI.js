require('dotenv').config({ path: `${__dirname}/.env` });
const https = require('https');

exports.getBestSellers = () => {
  let url = 'https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=';
  const books = [];
  url += process.env.API_KEY;

  https.get(url, (response) => {
    response.on('data', (data) => {
      const bookData = JSON.parse(data);
      const numOfResults = bookData.num_results; // Get the number of books returned in API call
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

        let rankIcon;
        if (book.rank > book.rankLastWeek) {
          rankIcon = '⇧';
        } else if (book.rank === book.rankLastWeek) {
          rankIcon = '-';
        } else if (book.rank < book.rankLastWeek) {
          rankIcon = '⇩';
        } else {
          rankIcon = '(new entry)';
        }

        book.rankIcon = rankIcon;

        books.push(book);
      }
    });
  });
  return { pageTitle: 'Hardcover Fiction', books }
};

require('dotenv').config({ path: `${__dirname}/.env` });
const https = require('https');

exports.getListNames = (callback) => {
  let url = 'https://api.nytimes.com/svc/books/v3/lists/names.json?api-key='
  url += process.env.API_KEY;

  let listNames = [];

  https.get(url, (response) => {
    response.on('data', (data) => {
      const listNamesData = JSON.parse(data);
      listNames = listNamesData.results;
      callback(listNames);
    });
  });
};

exports.getBestSellers = (listName, callback) => {
  const lName = listName || 'hardcover-fiction'; // Default to hardcover-fiction
  let url = `https://api.nytimes.com/svc/books/v3/lists.json?list=${lName}&api-key=`;
  url += process.env.API_KEY;

  const books = [];
  let chunks = [];

  https.get(url, (response) => {
    response.on('data', (data) => {
      chunks.push(data);
    }).on('end', () => {
      const data = Buffer.concat(chunks);
      const bookData = JSON.parse(data);
      const numOfResults = bookData.num_results;

      let i;
      for (i = 0; i < numOfResults; i += 1) {
        if (bookData.results[i] !== undefined) {
          // Assign some key book info to an object
          const book = {
            name: bookData.results[i].book_details[0].title,
            description: bookData.results[i].book_details[0].description,
            author: bookData.results[i].book_details[0].author,
            amazonProductUrl: bookData.results[i].amazon_product_url,
            rank: bookData.results[i].rank,
            rankLastWeek: bookData.results[i].rank_last_week,
            ISBN13: bookData.results[i].book_details[0].primary_isbn13,
            isbns: bookData.results[i].isbns,
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

          findValidUrl(book.isbns, (url) => {
            setTimeout(() => {
              book.imageURL = url;
              books.push(book);
            }, 500);
          });
        }
      }
      setTimeout(() => {
        books.sort((a, b) => ((a.rank > b.rank) ? 1 : -1));
        callback({ books });
      }, 1500);
    });
  });
};

function findValidUrl(isbns, callback) {
  let foundUrl = false;
  isbns.forEach((isbn) => {
    const url = `https://s1.nyt.com/du/books/images/${isbn.isbn13}.jpg`;
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        if (foundUrl === false) {
          callback(url);
          foundUrl = true;
        }
      }
    });
  });
}

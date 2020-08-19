//https://developer.nytimes.com/
//https://developer.nytimes.com/docs/books-product/1/overview
//https://any-api.com/nytimes_com/books_api/docs/API_Description

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

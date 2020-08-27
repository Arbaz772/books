# Books

I created this project so I could exercise my Node.js skills by producing a site that
utilise an API. Books utilises the [NY Times Books API](https://developer.nytimes.com/docs/books-product/)
to provide a slick interface for viewing top rated books.

## Requirements
You will need to have Node.js installed to run this project, please visit the node site for install
instructions: https://nodejs.org/en/download/

## Install
Once you have NPM installed you can run the following shell commands to install this project:
```
git clone https://github.com/jb-0/books.git
cd Books
npm install
```

## Configure the app
As the application requires an API Key to interact with the NY Times Books API, you will need to
firstly sign up for one.

Once you have a key you will need to create a file named ".env" in the project root directory:
```
touch .env
```

You should then add your API key to the .env file in the following format:
API_KEY=<Insert API key here as plain text, no quotes needed>

## Running the application
To run the app you can execute the following command in the project root directory:
```
node app.js
```

Using your preferred web browser you can navigate to localhost:3000 to view and use the app.

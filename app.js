var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Genre = require('./models/genre');

//Connect to database
mongoose.connect('mongodb://localhost/bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;

app.get('/', function (req, res) {
  res.send('Please use /api/books or /api/genres');
});

app.get('/api/genres', function (req, res) {
  Genre.getGenres(function (err, genres) {
    if (err) {
      throw err;
    }
    res.json(genres);
  });
});

app.listen(3000);
console.log('Running on PORT 3000');

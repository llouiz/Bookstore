var express = require('express');
var app = express();
var mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.get('/api/genres/:_id', (req, res) => {
  Genre.getGenre(req.params._id, (err, genre) => {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

app.post('/api/genres', (req, res) => {
  var genre = req.body;
  Genre.addGenre(genre, (err, genre) => {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

app.put('/api/genres/:_id', (req, res) => {
  var id = req.params._id;
  genre = req.body;
  Genre.updateGenre(id, genre, {}, (err, genre) => {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

app.delete('/api/genres/:_id', (req, res) => {
  var id = req.params._id;
  Genre.removeGenre(id, (err, genre) => {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

app.listen(3000);
console.log('Running on PORT 3000');

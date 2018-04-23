const DEFAULT_AIT_PORT = 3000;

// database setup
require('./db');
const mongoose = require('mongoose');

// express
const express = require('express');
const app = express();

// static files
const path = require("path");
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// body parser
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'hbs');

const Review = mongoose.model('Review');

app.get('/api/messages', function(req, res) {
  // TODO: retrieve all reviews or use filters coming in from req.query
  // send back as JSON list
  const fyr = req.query.year || '';
  const fsem = req.query.semester || '';
  let searchobj = {};
  if(fyr){
    searchobj.year = fyr;
  }
  if(fsem){
    searchobj.semester = fsem;
  }
  Review.find(searchobj, function(err, reviews){
      res.json(reviews.map(function(ele){
        return {
          'name':ele.name,
          'semester':ele.semester,
          'year':ele.year,
          // 'professor':ele.professor,
          'review':ele.review
        };
      }));
    })
});

app.post('/api/message', (req, res) => {
      const newreview = new Review({
        name: req.body.name,
        semester: req.body.semester,
        year: req.body.year,
        review: req.body.review
      });
      newreview.save(function(err){
        if(err){
          return {'error': 'failed to save review'};
        }
        else{
          return res.json({
            'name':req.body.name,
            'semester':req.body.semester,
            'year':req.body.year,
            'review':req.body.review
          });
        }
      });
});

app.listen(process.env.PORT || DEFAULT_AIT_PORT, (err) => {
  console.log('Server started (ctrl + c to shut down)');
});

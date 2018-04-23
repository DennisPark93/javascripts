const express = require('express');
const mongoose = require('mongoose');

require('./db');
const session = require('express-session');
const path = require('path');
const auth = require('./auth.js');
const app = express();
const Article = mongoose.model('Article');
const User = mongoose.model('User');

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'add session secret here!',
    resave: false,
    saveUninitialized: true,
}));

app.use(function (req, res, next) {
  res.locals.user = req.session.user || null;
  next();
})

app.get('/', (req, res) => {
  Article.find({}, function(err, list, count){
    if(list){
      res.render('index', {list:list});
    }
    else{
      res.render('index');
    }
  });
});

app.get('/article/add', (req, res) => {
  if(req.session.user=== null || req.session.user === undefined){
    res.redirect('/');
  }
  else{
    res.render('article-add')
  }
});

app.post('/article/add', (req, res) => {
  if(req.session.user=== null || req.session.user === undefined){
    res.redirect('/');
  }
  else{
    const newArticle = new Article({
      title:req.body.title,
      url: req.body.url,
      description: req.body.description,
      userID: req.session.user._id
    });
    newArticle.save(function(err){
      if(err){
        const errmessage = "DOCUMENT SAVE ERROR";
        console.log(errmessage);
        res.render('article-add', {message: errmessage});
      }
      else{
        res.redirect('/');
      }
    });
  }
});

// come up with a url for /article/slug-name!
app.get('/article/:slug', (req, res) => {
  Article.findOne({slug: req.params.slug}, function(err,article){
    if(!err){
      User.findOne({_id: article.userID}, function(err,user){
        if(!err){
          res.render('article-detail', {article: article, username: user.username});
        }
      });
    }
    else{
      console.log(err);
    }
  });
});


app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  auth.register(req.body.username, req.body.email, req.body.password, function(errObj){
    res.render('register', {message:errObj.message});
  }, function(User){
    auth.startAuthenticatedSession(req, User, function(err){
      if(!err){
        res.redirect('/');}
      else{
        res.render('register', {message:err.message});
      }
    });
  });
});


app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  auth.login(req.body.username, req.body.password,
    function(errObj){
      res.render('login', {message:errObj.message});
    },
    function(User){
      auth.startAuthenticatedSession(req, User, function(err){
        if(!err){
          res.redirect('/');}
        else{
          res.render('login', {message:err.message});
        }
      });
    });
});

//Bonus
app.get('/:slug', (req, res) => {
  User.findOne({slug: req.params.slug}, function(err,user){
    if(!err){
      Article.find({userID: user._id}, function(err,article){
        if(!err){
          res.render('user-detail', {article: article, username: user.username});
        }
      });
    }
    else{
      console.log(err);
    }
  });
});

app.listen(3000);
console.log('Started server on port 3000');

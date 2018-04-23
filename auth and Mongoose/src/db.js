

const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

// add your schemas


const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: {type: String, unique: true, required: true}
});

const ArticleSchema = new Schema({
  title: String,
  url: String,
  description: String,
  userID: String
});



// use plugins (for slug)
ArticleSchema.plugin(URLSlugs('title'));

// use plugins (for slug) - Bonus
UserSchema.plugin(URLSlugs('username'));

// register your model
mongoose.model('User', UserSchema);
mongoose.model('Article', ArticleSchema);

mongoose.connect('mongodb://localhost/auth');

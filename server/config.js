require('dotenv').config();

module.exports = {
  // App Settings
  MONGO_URI: process.env.MONGOLAB_URI,
  TOKEN_SECRET: process.env.TOKEN_SECRET,

  // OAuth 2.0
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  INSTAGRAM_SECRET: process.env.INSTAGRAM_SECRET,
  LINKEDIN_SECRET: process.env.LINKEDIN_SECRET,

  // OAuth 1.0
  TWITTER_KEY: process.env.TWITTER_KEY,
  TWITTER_SECRET: process.env.TWITTER_SECRET
};
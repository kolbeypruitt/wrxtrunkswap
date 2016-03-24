var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  displayName: String,
  picture: String,
  facebook: String,
  google: String,
  instagram: String,
  linkedin: String,
  twitter: String,
});

userSchema.pre('validate', function(next) {
  var user = this;
  User.findOne({email : user.email},function(err, existingUser) {
    if (existingUser && user && existingUser.id===user.id) {
      next()
    } else if (existingUser && user && existingUser.id!==user.id) {
      user.email = '';
    }
  })
  next();
});

userSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, done) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
//import all needed modules
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
//tell to use passport-localStrategy
//finding user and authentication using passport
passport.use(new LocalStrategy({
  usernameField: 'email'
},
  function (email, password, done) {   //done is callback function which tells passport user is find or not
    //find a user and establish the identity
    User.findOne({ email: email }, function (err, user) {
      if (err) {
        console.log('Error in finding user ---> Passport');
        return done(err);
      }
      if (!user || user.password != password) {
        //user is not founf or passport not matched}
        console.log('Invalid Username/password');
        return done(null, false);   //authentication is not done
      }

      return done(null, user);
    });
  }
));


//after authentication, serializing the user to decide which is to be kept in cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);   //automatically put encrypted key in cookie
});



//after logging,request comes in, deserializing the user from the key in cookies
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log('Error in finding user ---> Passport');
      return done(err);
    }

    return done(null, user);
  });
});



//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  //if user is signed in,then pass on the request to the next function(controller's action)
  if (req.isAuthenticated()) {
    return next();
  }

  //if the user is not signed in
  return res.redirect('/users/sign-in');
}

//set the user for views
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  return next();
}
module.exports = passport;
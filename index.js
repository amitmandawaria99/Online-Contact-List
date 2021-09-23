const express = require('express');
const app = express();
const path = require('path');
const port = 8000;
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');


//requring the mongodb file just befor express server fire up
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const session = require('express-session');
const passport = require('passport');
const passportlocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');


app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', './views');


var contactList = [
  {
    name: "amit mandawaria",
    phone: 111111111
  },
  {
    name: "tony stark",
    phone: 123456789
  },
  {
    name: "priti bajaj",
    phone: 222222222
  }
];

//mongo store is used to store the session cookie in the db
app.use(session({
  name: 'codeial',
  //TODO change the secret before deployment in production mode
  secret: 'blahsomething',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: (1000 * 60 * 100)
  },
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost/contacts_list_db',
    autoRemove: 'disabled'
  },
    function (err) {
      console.log(err || 'connect-mongodb setup ok');
    }
  )
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router(must be here)
app.use('/', require('./routes'));

app.listen(port, function (err) {
  if (err) { console.log('error in server') };
  console.log('yup! server is running on port : ', port);
});
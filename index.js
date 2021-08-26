const express = require('express');
const path = require('path');
const port = 8000;



//requring the mongodb file just befor express server fire up
const db = require('./config/mongoose');
const Contact = require('./models/contact');


const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
//middleware


app.use(express.urlencoded());   //parser,middleware (called before every controller and take req,res all values)
app.use(express.static('assets'));   //if you need any static file(relative links) then search in assets folder

//middleware1 executes from top to bottom
// app.use(function (req, res, next) {
//   req.myname = "amit";
//   console.log("mw1");
//   next();
// });
//middleware2 can be used after controllers
// app.use(function (req, res, next) {
//   console.log("mw2 ", req.myname);
//   next();
// });



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



//controller
app.get('/', function (req, res) {
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log('Error in fetching contact from database');
      return;
    }
    return res.render('home.ejs', {
      title: 'Contact List',
      contact_list: contacts
    });
  });
});
//controller
app.get('/practice', function (req, res) {
  return res.render('practice.ejs', {
    title: "practice"
  });
});
//controller
app.post('/create-contact', function (req, res) {
  // contactList.push({
  //   name: req.body.name,
  //   phone: req.body.phone
  // });
  // contactList.push(req.body);    //before reaches this part middleware manipulated data from browser
  Contact.create({
    name: req.body.name,
    phone: req.body.phone
  }, function (err, newContact) {
    if (err) { console.log('error in creating new contact'); return; }

    console.log('*********', newContact);
    return res.redirect('back');
  });
  // return res.redirect('back');
});



//for deleting an contact
//uses query param as maximum times uses
app.get('/delete-contact', function (req, res) {
  //get the id from query in the url
  let id = req.query.id;

  //find the contact in the database using id and delete
  Contact.findByIdAndUpdate
  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log('Error in deleting an object form database');
      return;
    }
    return res.redirect('back');
  });
});


app.listen(port, function (err) {
  if (err) { console.log('error in server') };
  console.log('yup! server is running on port : ', port);
});
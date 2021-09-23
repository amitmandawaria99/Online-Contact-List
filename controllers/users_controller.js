const User = require("../models/user")
const Contact = require("../models/contact");
const { findById } = require("../models/contact");
module.exports.profile = function (req, res) {
  res.render('user_profile', {
    title: "your - profile"
  })
}


//render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }

  return res.render('user_sign_up', {
    title: "Contact-list | Sign Up"
  })
}

//render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }

  return res.render('user_sign_in', {
    title: "Contact list Sign In"
  })
}

// get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect('back');
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) { console.log('error in finding user in signing up'); return }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) { console.log('error in creating user while signing up'); return }

        return res.redirect('/users/sign-in');
      })
    } else {
      return res.redirect('back');
    }

  });
}


//sign in and create a session for the user
module.exports.createSession = function (req, res) {
  return res.redirect('/users/home');
}


module.exports.destroySession = function (req, res) {
  req.logout();
  return res.redirect('/');
}

module.exports.home = function (req, res) {
  Contact.find({ email: req.user.email }, function (err, contacts) {
    if (err) {
      console.log('error in fetching contacts from database');
      return;
    }
    return res.render('user_home', {
      title: 'Your Contacts',
      contact_list: contacts
    });
  });
}
module.exports.create_contact = function (req, res) {
  Contact.create({
    name: req.body.name,
    phone: req.body.phone,
    email: req.user.email
  }, function (err, newContact) {
    if (err) { console.log('error in creating new contact'); return; }
    return res.redirect('back');
  });
}

module.exports.delete_contact = function (req, res) {
  let id = req.query.id;
  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log('Error in deleting contact from database');
      return;
    }
    return res.redirect('back');
  })
}

module.exports.update_contact_page = function (req, res) {
  let id = req.query.id;
  Contact.findById(id, function (err, current_contact) {
    return res.render('user_contact_update', {
      title: 'Update Contact',
      user: current_contact
    });
  });
}
module.exports.update_contact = function (req, res) {
  let id = req.query.id;
  Contact.findByIdAndUpdate(id, req.body, function (err, newcontact) {
    if (err) {
      console.log('Error in updating contact in Database');
      return res.render('/user/home');
    }
    res.redirect('/users/home');
  });
}
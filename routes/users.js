const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile', passport.checkAuthentication, usersController.profile);

//for making account
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.post('/create', usersController.create);

//use passport as middleware to authenticate
router.post('/create-session', passport.authenticate(
  'local',
  { failureRedirect: '/users/sign-in' },
), usersController.createSession);


router.get('/sign-out', usersController.destroySession);
module.exports = router;

//for contacts
router.get('/home', passport.checkAuthentication, usersController.home);
router.post('/create-contact', passport.checkAuthentication, usersController.create_contact);
router.get('/delete-contact', passport.checkAuthentication, usersController.delete_contact);
router.get('/update-contact-page', passport.checkAuthentication, usersController.update_contact_page);
router.post('/update-contact', passport.checkAuthentication, usersController.update_contact);
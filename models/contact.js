const mongoose = require('mongoose');



//creating Schema of database
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  }
});


//creating 'Contact' named collection in database
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
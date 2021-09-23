module.exports.home = function (req, res) {
  // console.log(req.cookies);
  console.log("reached hereeeee");
  res.cookie('user_id', 25);
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  return res.render('home', {
    title: "Contact - list"
  });
}

// module.exports.actionName = function(req, res){}
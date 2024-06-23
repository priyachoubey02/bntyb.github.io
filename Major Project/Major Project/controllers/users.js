const User = require("../models/user.js");

// SIGN UP ROUTE
module.exports.renderSignUp = (req, res) => {
    res.render("./users/signup.ejs");
};
module.exports.Signup = async (req, res) =>{
    try{
      let {username, email, password} = req.body;
      const newUser = new User({email, username});
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser, (err) =>{
       if(err){
        return next(err);
       }
       req.flash("success", "Registered Successfully");
       res.redirect("/listings");
     })
     
    } catch(e){
      req.flash("error", e.message);
      res.redirect("/signup");
    }
};

// SIGN IN ROUTE
module.exports.renderLogin =  (req, res) =>{
  res.render("./users/login.ejs");
};
module.exports.Login = async(req, res) =>{
  console.log(req.body);
  req.flash("success", "Welcome to Hotels DEKHO! You are logged in ");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

// LOGOUT ROUTE
module.exports.Logout = (req, res, next) =>{
  req.logout((err) =>{
    if(err){
     return next(next);
    }
    req.flash("success", "You are successfully loggedt out");
    res.redirect("/listings");
  });
};
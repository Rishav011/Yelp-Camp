var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/",(req,res) => {
    res.render("landingpage.ejs");
});
router.get("/register",function(req,res){
    res.render("register.ejs");
});

router.post("/register",function(req,res){
   var newUser = new User({username: req.body.username});
   User.register(newUser,req.body.password,function(err,user){
       if(err){
           console.log(err);
           req.flash("error","Something went wrong!");
           res.redirect("/register");
       } 
       passport.authenticate("local")(req,res,function(){
        req.flash("success","Welcome to YelpCamp " + user.username);
          res.redirect("/allcamps");
       });
   });
});

router.get("/login",function(req,res){
    res.render("login.ejs");
});

router.post("/login",passport.authenticate("local",{
    successRedirect:"/allcamps",
    failureRedirect:"/login"
}),function(req,res){

});

router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you out!");
    res.redirect("/allcamps");
});

module.exports = router;

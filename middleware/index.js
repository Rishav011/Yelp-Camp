var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj ={};
middlewareObj.userRouteOwnership =function(req,res,next){
    if(req.isAuthenticated()){
       Campground.findById(req.params.id,function(err,foundCampground){
           if(err){
               res.redirect("back");
           } else {
               if(foundCampground.author.id.equals(req.user._id)){
                   next();
               } else {
                req.flash("error","You do not have permission to do that!");
                   res.redirect("/allcamps");
               }
           }
       });
    }
    else{
        req.flash("error","You must be logged in first!!");
        res.redirect("/login");
    }
}

middlewareObj.commentRouteOwnership = function(req,res,next){
    if(req.isAuthenticated()){
       Comment.findById(req.params.comment_id,function(err,foundComment){
           if(err){
               res.redirect('back');
           } else {
               if(foundComment.author.id.equals(req.user._id)){
                   next();
               } else {
                   req.flash("error","You do not have permission to do that!");
                   res.redirect("/allcamps");
               }
           }
       });
    }
    else{
        req.flash("error","You must be logged in first!!");
        res.redirect("/login");
    }
}

middlewareObj.isLoggedIn = function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
    return next();
    }
    req.flash("error","You must be logged in first!!");
    res.redirect("/login");
    
};


module.exports = middlewareObj;


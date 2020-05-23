var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new",{camps:campground});
        }
    })
    
});

router.post("/",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                } else {
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","comment added successfully!");
                    res.redirect("/allcamps/" + campground._id);
                }
            });
        }
    }); 
});

router.get("/:comment_id/edit",middleware.commentRouteOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/edit",{camps_id:req.params.id});
        }
    });
});

router.put("/:comment_id",middleware.commentRouteOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/allcamps/" + req.params.id);
        }
    });
});

router.delete("/:comment_id",middleware.commentRouteOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }else {
            flash("success","comment deleted successfully!");
            res.redirect("back");
        }
    });
});

module.exports = router;
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/", (req,res) => {
    Campground.find({},function(err,allCampground){
        if(err){
            console.log(err);
        } else {
            res.render("allcamps/index",{camps:allCampground});
        }
    });
});

router.post("/",middleware.isLoggedIn,(req,res) =>{

    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id:req.user._id,
        username:req.user.username
    };
    var newCamps = {name : name, image : image, description : description,author:author};
    Campground.create(newCamps,function(err){
    if(err){
        console.log(err);
    } else {
        req.flash("success","Campground added successfully!");
        res.redirect("/allcamps");
    }
    }); 
    });
    
    
router.get("/new",middleware.isLoggedIn,(req,res) => {
res.render("allcamps/new.ejs");
});


router.get("/:id",(req,res) =>{

Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
    if(err){
        console.log(err);
    } else {
        res.render("allcamps/show.ejs",{camps:foundCampground});
    }
    });
});

router.get("/:id/edit",middleware.userRouteOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
        res.render("allcamps/edit",{camps:foundCampground});
        };
    });
   
});

router.put("/:id",middleware.userRouteOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.camps,function(err,updatedCamps){
        if(err){
            console.log(err);
            res.redirect("/allcamps");
        }
        else{
            res.redirect("/allcamps/" + req.params.id);
        }
    })
});

router.delete("/:id",middleware.userRouteOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/allcamps");
        }else {
            req.flash("success","Campground deleted successfully!");
            res.redirect("/allcamps");
        }
    });
});

module.exports = router;

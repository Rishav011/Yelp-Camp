var mongoose = require("mongoose"),
Campground = require("./models/campground"),
Comment     = require("./models/comment");

var data = [
    {
            name: "Salmon Creek",
            image:"https://www.outtherecolorado.com/wp-content/uploads/2017/03/23caa67e99c75c84468d07f6aa80027b-1024x683.jpg",
            description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque placeat aliquid aperiam nemo quis eius consequatur eveniet illum sed, pariatur tempore minima porro optio odit incidunt quos a quod! Vero quisquam voluptatem est architecto rem fugit excepturi, commodi veniam dolorum adipisci at quam iste, possimus facere sed obcaecati. Aliquid, facere!"
    },
    {   
        name: "Dimna Lake",
        image:"https://www.holidify.com/images/cmsuploads/compressed/bd80c684009f16668ba30261f4694934_20180124205019.png",
        description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque placeat aliquid aperiam nemo quis eius consequatur eveniet illum sed, pariatur tempore minima porro optio odit incidunt quos a quod! Vero quisquam voluptatem est architecto rem fugit excepturi, commodi veniam dolorum adipisci at quam iste, possimus facere sed obcaecati. Aliquid, facere!"

    },
    {
        name: "Shimla",
        image:"https://lp-cms-production.imgix.net/2019-06/GettyImages-465018978_master.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4",
        description:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque placeat aliquid aperiam nemo quis eius consequatur eveniet illum sed, pariatur tempore minima porro optio odit incidunt quos a quod! Vero quisquam voluptatem est architecto rem fugit excepturi, commodi veniam dolorum adipisci at quam iste, possimus facere sed obcaecati. Aliquid, facere!"
    }

];

function seedDB(){
Campground.deleteMany({},function(err){
    if(err){
        console.log("Error");
    } else {
        console.log("Campgrounds removed!!");
    }

    // data.forEach(function(seeds){
    //     Campground.create(seeds,function(err,campground){
    //         if(err){
    //             console.log(err);
    //         } else {
    //              console.log("Campground added!!");
    //             Comment.create({
    //                 text : "Nice pics!",
    //                 author : "Rishav"
    //             },function(err,comment){
    //                 if(err){
    //                     console.log(err);
    //                 } else {
    //                     campground.comments.push(comment);
    //                     campground.save();
    //                     console.log("Added comment!!!");
    //                 }
    //             });
    //         }
    //     });
    // });
});
}

module.exports = seedDB;


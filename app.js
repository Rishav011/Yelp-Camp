var express     =   require("express"),
app             =   express(),
bodyParser      =   require("body-parser"),
mongoose        =   require("mongoose"),
passport        =   require("passport"),
LocalStrategy   =   require("passport-local"),
methodOverride  =   require("method-override"),
User            =   require("./models/user.js"),
flash           =   require("connect-flash"),
seeds           =   require("./seeds.js");

var allCampsRoutes = require("./routes/allcamps"),
    commentsRoutes = require("./routes/comments"),
    indexRoutes     = require("./routes/index");
mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true,useUnifiedTopology:true});

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());

// seeds();

app.use(require("express-session")({
            secret:"anything",
            resave:false,
            saveUninitialized:false
        })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/allcamps",allCampsRoutes);
app.use("/allcamps/:id/comments",commentsRoutes);

app.listen(3000,function(){
    console.log("Server started");
});
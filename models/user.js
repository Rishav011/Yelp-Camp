var mongoose = require("mongoose");
var passportLocalMmongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    name: String,
    password: String
});

userSchema.plugin(passportLocalMmongoose);

module.exports = mongoose.model("User",userSchema);
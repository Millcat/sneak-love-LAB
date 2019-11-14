const mongoose = require("mongoose"); // import mongoose dependencie

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    lastname: String,
    email: String,
    password: String
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
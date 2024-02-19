/*
============================================
 Title: taylor-user.js
 Author: George Taylor
 Date:   02/18/24
 Description: contains schema for user
===========================================
*/

let mongoose = require('mongoose');

let Schema = mongoose.Schema;


let userSchema = new Schema({
    userName: { type: String },
    password: { type: String },
    emailAddress: {type: String}
});
module.exports = mongoose.model('User', userSchema);
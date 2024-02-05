/*
============================================
 Title: taylor-composer.js
 Author: George Taylor
 Date:   2/04/2024
 Description: contains schema for composer
===========================================
*/




let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let composerSchema = new Schema({
    firstName: { type: String},
    lastName: {type: String}
});

module.exports = mongoose.model('Composer', composerSchema);
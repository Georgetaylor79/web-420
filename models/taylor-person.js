/*
============================================
 Title: taylor-person.js
 Author: George Taylor
 Date:   02/11/2024
 Description: contains schema for person
===========================================
*/

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let roleSchema = new Schema({
    text: { type: String}
});

let dependentSchema = new Schema({
    firstName: { type: String},
    lastName: { type: String}
});

let personSchema = new Schema({
    firstName: { type: String},
    lastName: { type: String},
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: {type: String}
});
module.exports = mongoose.model('Person', personSchema);
/*
Title: taylor-team.js
Author: George Taylor
Date: 3/10/2024
Description: Schema 
*/

let mongoose = require('mongoose');

let Schema = mongoose.Schema;



let playerSchema = new Schema({
    firstName: { type: String},
    lastName: { type: String},
    salary: { type: Number}
});

let TeamSchema = new Schema({
    name: { type: String},
    mascot: { type: String},
    players: [playerSchema]
});
module.exports = mongoose.model('Team', TeamSchema);
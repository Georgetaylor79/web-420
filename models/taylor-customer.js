/*
============================================
 Title: taylor-customer.js
 Author: George Taylor
 Date:   2-25-2024
 Description: contains schema for customer
===========================================
*/

let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let lineItemSchema = new Schema({
    name: { type: String},
    price: { type: Number},
    quantity: { type: Number}
});

let invoiceSchema = new Schema({
    subtotal: { type: Number},
    tax: { type: Number},
    dateCreated: { type: String},
    dateShipped: { type: String},
    lineItems: [lineItemSchema]
});

let customerSchema = new Schema({
    firstName: { type: String},
    lastName: { type: String},
    userName: { type: String},
    invoices: [invoiceSchema]
});
module.exports = mongoose.model('Customer', customerSchema);
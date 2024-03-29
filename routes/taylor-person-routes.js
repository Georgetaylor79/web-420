/*
============================================
 Title: taylor-person-routes.js
 Author: George Taylor
 Date:   2/11/2024
 Description: person API - routes for person
===========================================
*/

let express = require('express');
let router = express.Router();
let Person = require('../models/taylor-person');

/**
* @openapi
* /api/persons:
*   get:
*       summary: returns a list of all persons
*       description: API for returning a list of persons from MongoDB Atlas
*       operationId: findAllPersons
*       responses:
*         '200':
*           description: Array of person documents
*         '500':
*           description: Server Exception
*         '501':
*           description: MongoDB Exception
*/
router.get('/persons', async (req, res) => {
    try {
        Person.find({}, function (err, persons) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
                console.log(persons);
                res.json(persons);
            };
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            'message': `Server Exception: ${error.message}`
        });
    };
});



/**
* @openapi
* /api/persons:
*   post:
*       summary: Creates a new person object
*       Description: Api for adding person object
*       requestBody:
*               description: Persons information
*               content:
*                   application/json:
*                       schema:
*                           required:
*                               - firstName
*                               - lastName
*                               - roles
*                               - dependents
*                               - birthDate
*                           properties:
*                               firstName:
*                                   type: string
*                               lastName:
*                                   type: string
*                               roles:
*                                   type: array
*                                   items:
*                                       type: object
*                                       properties:
*                                           text:
*                                               type: string
*                               dependents:
*                                   type: array
*                                   items:
*                                       type: object
*                                       properties:
*                                           firstName:
*                                               type: string
*                                           lastName:
*                                               type: string
*                               birthDate:
*                                   type: string
*       responses:
*           '200':
*               description: person added
*           '500':
*               description: Server Exception
*           '501':
*               description: MongoDB Exception
*/
router.post('/persons', async (req, res) => {
    try {
        let newPerson = {
            firstName: "Jim",
            lastName: "Thompson",
            roles: [{"text":"guest"}],
            dependents: [{"firstName": "Cindy", "lastName": "Williams"}],
            birthDate: new Date()
        };

        await Person.create(newPerson, function (err, person) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
                console.log(person)
                res.json(person);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            'message': `Server Exception: ${error.message}`
        });
    };
});

module.exports = router;
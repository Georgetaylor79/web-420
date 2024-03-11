/*
Title: taylor-team-routes.js
Author: George Taylor
Date: 3/10/2024
Description: Team API (Routes for team)
*/

let express = require('express');
let router = express.Router();
let Teams = require('../models/taylor-team');

/**
* openapi: 3.0.0
* @openapi
* /api/teams:
* get: 
*   summary: return a list of all teams
    description: API for returning a list of teams from MongoDB Atlas 
    operationId: findAllTeams
    responses:
      '200' : description: Array of teams documents 
      '500' : description: Server Exception
      '501' : description: MongoDB Exception
*/

router.get('/teams', async (req, res) => {
    try {
        Teams.find({}, function (err, teams) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
                console.log(teams);
                res.json(teams);
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
 * /api/teams/:id/players
 * post:
 * summary: adding player to a team
 * Description: api for using team id to add player to a team
 * operationId: assignPlayerToTeam
 * parameters:
 *  name: id
 *  description: id of team
 *  in: path
 *  schema: 
 *  type: string
 *  required: true
 *  requestBody:
 *  description: player information
 *  content:
 *  application/json:
 *  schema:
 *  type: object
 *  required: first name, last name, salary 
 *  properties: first name: type string, last name: type string, salary: type: number
 * Responses:
 *   '200': description: player document
 *   '400': description: invalid teamId
 *   '500': description: server exception 
 *   '501': description: MongoDB exception
 * 
 */
router.post('/teams/:id/players', async (req, res) => {
    try {
        Teams.findOne({ _id: req.params.id }, async (err, team) => {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
               
                let newPlayer = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    salary: req.body.salary
                };

                team.players.push(newPlayer);
                team.save();
                console.log(team);
                res.json(team.players);
                
            }
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
 * /api/teams/:id/players
 * get:
 * summary: give an array of all players within a team
 * description: api for return value of players in a team
 * parameters:
 * name: id 
 * description: teamId request by user
 * in: path
 * schema: type: string
 * 
 * responses
 * '200': description: array of player documents
 * '401': description: invalid teamId
 * '500': description: server exception
 * '501': description: MongoDB Exception
 */

router.get('/teams/:id/players', async (req, res) => {
    try {
        Teams.findOne({ _id: req.params.id }, function (err, team) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
                console.log(team.players);
                res.json(team.players);
            }
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
 * /api/teams/:id
 * delete
 * summary: removes a team from MongoDB
 * description: deletes a single team in MongoDB
 * operationId: deleteTeamById
 * Parameters:
 * name: id
 * in: path
 * required: true
 * description: document to be removed by id
 * schema: type: string
 * 
 * responses:
 * '200': description: Team document
 * '401': description: Invalid teamId
 * '500': Server Exception
 * '501': MongoDB Exception
 */

router.delete('/teams/:id', async (req, res) => {
    try {
        const teamId = req.params.id;

        Teams.findByIdAndDelete({ _id: teamId }, function (err, composer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
                console.log(composer);
                res.status(200).send({
                    'message': `Team ${req.params.id} has been removed`
                });
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

/*
============================================
 Title: taylor-composer.js
 Author: George Taylor 
 Date:   2/4/24
 Description: contains schema for composer
===========================================
*/

let express = require("express");
let http = require("http");
let swaggerUi = require("swagger-ui-express");
let swaggerJsdoc = require("swagger-jsdoc");
let mongoose = require("mongoose");
// let composerAPI = require("./routes/taylor-composer-routes");
let teamAPI = require("./routes/taylor-composer-routes");

let app = express();
let bodyParser = require("body-parser");

app.set("port", process.env.PORT || 3000);
app.set(express.json());
// app.set(express.urlencoded({'extended': true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //this is needed to have swagger pass the json to the node api

let conn = "mongodb+srv://taylor79:s3cret@cluster0.f36akkm.mongodb.net/ ";
mongoose
  .connect(conn, {
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`Connection to web420DB on MongoDB Atlas Successful`);
  })
  .catch((error) => {
    console.log(`MongoDB Error: ${error.message}`);
  });

const options = {
  definition: {
    openapi: "3.0.0",
    explorer: true,
    info: {
      title: "WEB 420 RESTful APIs",
      version: "1.0.0",
    },
  },
  apis: ["./routes/*js"],
};

let openapiSpecification = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use("/api", teamAPI);

http
  .createServer(
    console.log("Application started and listening to port 3000"),
    app
  )
  .listen(process.env.PORT || 3000);

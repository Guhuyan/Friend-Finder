// Dependencies
const express = require("express");
const path = require("path");

// Creating a server on our app
var app = express();

// Dynamic port
var PORT = process.env.PORT || 8080;

// Setting up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routing
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Tell the server to listen for request
app.listen(PORT, function () {
    console.log("App is now listening on PORT: " + PORT);
});
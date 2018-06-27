var express = require("express");
var app = express();
var path = require("path");
var bp = require("body-parser");
var session = require("express-session");
var mongoose = require("mongoose");
var port = 8000;

app.use(bp.json());
app.use(express.static(path.join(__dirname, "./client/dist")));
app.use(express.static(__dirname + '/client/dist'));
app.use(session({secret: "logreg project"}));

require("./server/config/mongoose");
require("./server/config/routes")(app);

app.listen(port, function() {
    console.log("listening on ", port);
});

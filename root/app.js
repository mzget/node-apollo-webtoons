"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var apollo_server_express_1 = require("apollo-server-express");
var dbClient_1 = require("./dbClient");
var schema_1 = require("./graphql/schema");
process.env.NODE_ENV = "development";
global["version"] = "0.0.1";
var app = express();
if (app.get("env") === "development") {
    process.env.PORT = "4000";
}
else if (app.get("env") === "production") {
    process.env.PORT = "4000";
}
console.log("listen on ", process.env.PORT);
dbClient_1.InitDatabaseConnection().then(function (db) {
    db.stats().then(function (stat) {
        console.log("Success to connect db", stat);
    });
})["catch"](function (err) {
    console.error(err.message);
});
var index_1 = require("./routes/index");
var users = require("./routes/users");
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", index_1["default"]);
app.use("/users", users);
app.use("/api/graphql", bodyParser.json(), apollo_server_express_1.graphqlExpress(function (request) { return ({
    schema: schema_1["default"],
    context: { headers: request.headers },
    debug: true
}); }));
app.use("/api/graphiql", apollo_server_express_1.graphiqlExpress({
    endpointURL: "/api/graphql"
}));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
exports["default"] = app;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const apollo_server_express_1 = require("apollo-server-express");
const nconf = require("nconf");
const dbClient_1 = require("./dbClient");
const graphql_1 = require("./graphql");
const app = express();
app.use(cors());
console.log("listen on ", process.env.PORT);
// Read in keys and secrets. Using nconf use can set secrets via
// environment variables, command-line arguments, or a keys.json file.
nconf.argv().env().file("keys.json");
const database = nconf.get("mongoDatabase");
dbClient_1.InitDatabaseConnection().then((client) => client.db(database).stats().then((stat) => {
    console.log("Success to connect db", stat.db);
})).catch((err) => {
    console.error("Fail to connect db", err.message);
});
const routes_1 = require("./routes");
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", routes_1.default);
app.use("/api/graphql", bodyParser.json(), apollo_server_express_1.graphqlExpress((request) => ({
    schema: graphql_1.default,
    context: {
        headers: request.headers,
        token: request.headers.token,
        userAgent: request.headers["user-agent"],
        forwardAddress: request.headers["x-forwarded-for"],
    },
    debug: true,
    tracing: true,
    cacheControl: true,
})));
app.use("/api/graphiql", apollo_server_express_1.graphiqlExpress({
    endpointURL: "/api/graphql",
}));
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    // next(err);
    res.json(err).status(err.status);
});
// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
module.exports = app;

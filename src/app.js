"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const apollo_server_express_1 = require("apollo-server-express");
const nconf = require("nconf");
const dbClient_1 = require("./dbClient");
const index_1 = require("./graphql/schema/index");
process.env.NODE_ENV = `production`;
global["version"] = "0.0.1";
const app = express();
app.use(cors());
if (app.get("env") === "development") {
    process.env.PORT = "4000";
}
else if (app.get("env") === "production") {
    process.env.PORT = "4000";
}
console.log("listen on ", process.env.PORT);
// Read in keys and secrets. Using nconf use can set secrets via
// environment variables, command-line arguments, or a keys.json file.
nconf.argv().env().file('keys.json');
const database = nconf.get('mongoDatabase');
dbClient_1.InitDatabaseConnection().then((client) => client.db(database).stats().then((stat) => {
    console.log("Success to connect db", stat);
})).catch(err => {
    console.error(err.message);
});
const index_2 = require("./routes/index");
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", index_2.default);
app.use("/api/graphql", bodyParser.json(), apollo_server_express_1.graphqlExpress((request) => ({
    schema: index_1.default,
    context: { headers: request.headers },
    debug: true,
})));
app.use("/api/graphiql", apollo_server_express_1.graphiqlExpress({
    endpointURL: "/api/graphql",
}));
// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
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

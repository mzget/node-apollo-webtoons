import * as express from "express";
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { InitDatabaseConnection } from "./dbClient";
import schema from "./graphql/schema";

process.env.NODE_ENV = `development`;
global["version"] = "0.0.1";

const app = express();
if (app.get("env") === "development") {
  process.env.PORT = "3001";
} else if (app.get("env") === "production") {
  process.env.PORT = "3001";
}
console.log("listen on ", process.env.PORT);

InitDatabaseConnection().then((db) => {
  db.stats().then((stat) => {
    console.log("Success to connect db", stat);
  });
}).catch((err) => {
  console.error(err.message);
});

const index = require("./routes/index");
const users = require("./routes/users");

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/users", users);
app.use("/api/graphql", bodyParser.json(), graphqlExpress((request: any) => ({
  schema,
  context: { headers: request.headers },
  debug: true,
})));
app.use("/api/graphiql", graphiqlExpress({
  endpointURL: "/api/graphql",
}));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found") as Error | any;
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

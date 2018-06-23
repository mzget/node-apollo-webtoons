import * as express from "express";
import * as cors from "cors";
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import * as nconf from "nconf";

import { InitDatabaseConnection } from "./dbClient";
import schema from "./graphql";

const app = express();
app.use(cors());
console.log("listen on ", process.env.PORT);

// Read in keys and secrets. Using nconf use can set secrets via
// environment variables, command-line arguments, or a keys.json file.
nconf.argv().env().file("keys.json");

const database = nconf.get("mongoDatabase");
InitDatabaseConnection().then((client) =>
  client.db(database).stats().then((stat) => {
    console.log("Success to connect db", stat);
  }),
).catch((err) => {
  console.error(err.message);
});

import index from "./routes/index";

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/api/graphql", bodyParser.json(), graphqlExpress((request: any) => ({
  schema,
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

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const nconf = require("nconf");
// Read in keys and secrets. Using nconf use can set secrets via
// environment variables, command-line arguments, or a keys.json file.
nconf.argv().env().file('keys.json');
const user = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');
const port = nconf.get('mongoPort');
exports.database = nconf.get('mongoDatabase');
let uri = `mongodb://${user}:${pass}@${host}:${port}`;
if (exports.database) {
    uri = `${uri}/${exports.database}`;
}
let client = Object.create(null);
exports.getClient = () => {
    return client;
};
function InitDatabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        const opt = { reconnectTries: Number.MAX_VALUE };
        console.log(uri);
        client = yield MongoClient.connect(uri, opt);
        client.on("close", (err) => {
            console.error("close", err);
        });
        client.on("error", (err) => {
            console.error("error", err);
        });
        client.on("timeout", (err) => {
            console.error("timeout", err);
        });
        client.on("reconnect", (server) => {
            console.log("reconnect", server);
        });
        return client;
    });
}
exports.InitDatabaseConnection = InitDatabaseConnection;

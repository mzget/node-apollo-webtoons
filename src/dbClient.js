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
const config_1 = require("./config");
let appDB = Object.create(null);
exports.getAppDb = () => {
    return appDB;
};
function InitDatabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        const opt = { reconnectTries: Number.MAX_VALUE };
        appDB = yield MongoClient.connect(config_1.Config.dbHost, opt);
        appDB.on("close", (err) => {
            console.error("close", err);
        });
        appDB.on("error", (err) => {
            console.error("error", err);
        });
        appDB.on("timeout", (err) => {
            console.error("timeout", err);
        });
        appDB.on("reconnect", (server) => {
            console.log("reconnect", server);
        });
        return appDB;
    });
}
exports.InitDatabaseConnection = InitDatabaseConnection;

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
const express = require("express");
const mongodb = require("mongodb");
const dbClient_1 = require("../dbClient");
const config_1 = require("../config");
const router = express.Router();
const { ObjectID } = mongodb;
/* GET users listing. */
router.get("/", (req, res, next) => {
    res.status(200).json({ title: "webtoons contents" });
});
function findContent(episode) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield dbClient_1.getClient();
        const collection = client.db(dbClient_1.database).collection(config_1.dbCollections.CONTENTS);
        yield collection.createIndex({ epNo: 1 });
        const docs = yield collection.find({ epNo: episode }).limit(1).toArray();
        return docs;
    });
}
exports.findContent = findContent;
function findContents(programId, seasonId) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield dbClient_1.getClient();
        const collection = client.db(dbClient_1.database).collection(config_1.dbCollections.CONTENTS);
        yield collection.createIndex({ seasonId: 1 });
        const docs = yield collection.find({ programId: new ObjectID(programId.toString()) }).toArray();
        return docs;
    });
}
exports.findContents = findContents;
exports.default = router;

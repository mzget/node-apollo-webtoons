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
const { ObjectID } = mongodb;
const dbClient_1 = require("../../dbClient");
const config_1 = require("../../config");
function findContent(episode) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield dbClient_1.getClient();
        const collection = client.db(dbClient_1.database).collection(config_1.dbCollections.CONTENTS);
        const docs = yield collection.find({ epNo: episode }).limit(1).toArray();
        return docs;
    });
}
exports.findContent = findContent;
function findContents(programId, seasonId) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield dbClient_1.getClient();
        const collection = client.db(dbClient_1.database).collection(config_1.dbCollections.CONTENTS);
        const docs = yield collection.find({ programId: new ObjectID(programId.toString()) }).sort({ epNo: 1 }).toArray();
        return docs;
    });
}
exports.findContents = findContents;
function updateContent(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield dbClient_1.getClient();
        const collection = client.db(dbClient_1.database).collection(config_1.dbCollections.CONTENTS);
        yield collection.createIndex({ seasonId: 1 });
        yield collection.createIndex({ epNo: 1 });
        const update = {
            epNo: data.epNo,
            epName: data.epName,
            src: data.src,
            name: data.name,
            programId: new ObjectID(data.programId),
            seasonId: new ObjectID(data.seasonId),
        };
        const writeOps = yield collection.update({ epNo: data.epNo }, {
            $set: update,
        }, { upsert: true });
        return writeOps.result;
    });
}
exports.updateContent = updateContent;

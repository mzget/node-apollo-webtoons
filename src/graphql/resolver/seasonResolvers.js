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
const dbClient_1 = require("../../dbClient");
const config_1 = require("../../config");
const mongodb_1 = require("mongodb");
function findItems(programId) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield dbClient_1.getClient();
        const collection = client.db(dbClient_1.database).collection(config_1.dbCollections.SEASONS);
        const docs = yield collection.find({ programId: new mongodb_1.ObjectId(programId.toString()) }).sort({ no: 1 }).toArray();
        return docs;
    });
}
exports.findItems = findItems;
// FindSeasonByNumber
function findSeasonByNumber(seasonNo) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield dbClient_1.getClient();
        const collection = client.db(dbClient_1.database).collection(config_1.dbCollections.SEASONS);
        const docs = yield collection.find({ no: seasonNo }).limit(1).toArray();
        return docs;
    });
}
exports.findSeasonByNumber = findSeasonByNumber;

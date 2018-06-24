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
function findPrograms() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield dbClient_1.getClient();
        const collection = client.db(dbClient_1.database).collection(config_1.dbCollections.PROGRAMS);
        const docs = yield collection.find({}).toArray();
        return docs;
    });
}
exports.findPrograms = findPrograms;

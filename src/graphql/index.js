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
const graphql_tools_1 = require("graphql-tools");
const schema_1 = require("./schema");
/** resolver fucntions */
const programResolvers_1 = require("./resolver/programResolvers");
const seasonResolves = require("./resolver/seasonResolvers");
const contentResolvers_1 = require("./resolver/contentResolvers");
const resolvers = {
    Query: {
        lists(obj, args, context, info) {
            return programResolvers_1.findPrograms();
        },
        seasons(obj, args, context, info) {
            return __awaiter(this, void 0, void 0, function* () {
                const { programId } = args;
                const seasons = yield seasonResolves.findItems(programId);
                return seasons;
            });
        },
        season(obj, args, context, info) {
            return __awaiter(this, void 0, void 0, function* () {
                const { programId, id } = args;
                const seasons = yield seasonResolves.findSeasonByNumber(id);
                return seasons[0];
            });
        },
        contents(obj, args, context, info) {
            return __awaiter(this, void 0, void 0, function* () {
                const { seasonNo, programId } = args;
                let seasonInfo = {};
                if (seasonNo) {
                    const seasons = yield seasonResolves.findSeasonByNumber(seasonNo);
                    seasonInfo = seasons[0];
                }
                if (programId || seasonNo) {
                    const docs = yield contentResolvers_1.findContents(programId, seasonInfo._id);
                    return docs;
                }
                else {
                    return null;
                }
            });
        },
        content(obj, args, context, info) {
            return __awaiter(this, void 0, void 0, function* () {
                const { episode } = args;
                if (episode) {
                    const docs = yield contentResolvers_1.findContent(episode);
                    return docs[0];
                }
                else {
                    return null;
                }
            });
        },
    },
    Mutation: {
        content: (obj, { fields }, context, info) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield contentResolvers_1.updateContent(fields);
                return JSON.stringify(result);
            }
            catch (ex) {
                return Promise.reject(ex);
            }
        }),
    },
    Content: {
        season: (content) => __awaiter(this, void 0, void 0, function* () {
            const seasons = yield seasonResolves.findItems(content.programId);
            const results = seasons.filter((season) => {
                return `${season._id}` === `${content.seasonId}`;
            });
            return results[0];
        }),
    },
    Season: {
        program: (season) => __awaiter(this, void 0, void 0, function* () {
            const programs = yield programResolvers_1.findPrograms();
            const results = programs.filter((program) => {
                return program._id.toString() === season.programId.toString();
            });
            return yield results[0];
        }),
    },
};
// const logger = { log: (error: string | Error) => console.log(error) };
const executeSchema = { typeDefs: schema_1.typeDefs, resolvers };
const schema = graphql_tools_1.makeExecutableSchema(executeSchema);
exports.default = schema;

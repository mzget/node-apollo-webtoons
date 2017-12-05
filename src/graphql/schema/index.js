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
const Mocks_1 = require("../../mock/Mocks");
const Cartoon_1 = require("./Cartoon");
const Lang_1 = require("./Lang");
const Program_1 = require("./Program");
const Season_1 = require("./Season");
/** resolver fucntions */
const contents_1 = require("../../routes/contents");
const log = { log: (error) => console.log(error) };
const RootQuery = `
type Query {
    lists : [Program]
    seasons(programId: Int!): [Season]
    season(programId: Int!, id: Int!): Season
    contents(seasonId: String) : [Content]
    content(episode: Int!) : Content
}
`;
const SchemaDefinition = `
schema {
  query: Query
}
`;
const typeDefs = [SchemaDefinition, RootQuery,
    ...Program_1.Program,
    ...Lang_1.Lang,
    ...Season_1.Season,
    ...Cartoon_1.Content,
];
const resolvers = {
    Query: {
        lists(obj, args, context, info) {
            return Mocks_1.Programs;
        },
        seasons(obj, args, context, info) {
            const { programId } = args;
            const seasons = Mocks_1.Seasons.filter((season) => {
                return season.programId === programId;
            });
            return seasons;
        },
        season(obj, args, context, info) {
            const { programId, id } = args;
            const seasons = Mocks_1.Seasons.filter((season) => {
                return season.programId === programId;
            });
            return seasons[id];
        },
        contents(obj, args, context, info) {
            return __awaiter(this, void 0, void 0, function* () {
                const { seasonId } = args;
                if (seasonId) {
                    const docs = yield contents_1.findContents(seasonId);
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
                    const docs = yield contents_1.findContent(episode);
                    return docs[0];
                }
                else {
                    return null;
                }
            });
        },
    },
    Content: {
        season: (content) => {
            const seasons = Mocks_1.Seasons.filter((season) => {
                return season.id === content.seasonId;
            });
            return seasons[0];
        },
    },
    Season: {
        program: (season) => {
            const programs = Mocks_1.Programs.filter((program) => program.id === season.programId);
            return programs[0];
        },
    },
};
const schema = graphql_tools_1.makeExecutableSchema({
    typeDefs,
    resolvers,
    logger: log,
});
exports.default = schema;

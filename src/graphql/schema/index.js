"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cartoon_1 = require("./cartoon");
const lang_1 = require("./lang");
const program_1 = require("./program");
const season_1 = require("./season");
const RootQuery = `
    type Query {
        lists : [Program]
        seasons(programId: String!): [Season]
        season(programId: String!, id: Int!): Season
        contents(programId: String!, seasonId: String) : [Content]
        content(episode: Int!) : Content
    }
`;
const SchemaDefinition = `
    schema {
    query: Query
    }
`;
exports.typeDefs = [SchemaDefinition, RootQuery,
    ...program_1.Program,
    ...lang_1.Lang,
    ...season_1.Season,
    ...cartoon_1.Content,
];

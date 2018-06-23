"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const content_1 = require("./content");
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
const Mutation = `
    # this schema allows the following mutation:
    type Mutation {
        content(fields: ContentInput!): Content
    }
`;
const SchemaDefinition = `
    schema {
        query: Query
        mutation: Mutation
    }
`;
exports.typeDefs = [
    SchemaDefinition,
    RootQuery,
    Mutation,
    ...program_1.Program,
    ...lang_1.Lang,
    ...season_1.Season,
    ...content_1.Content,
];

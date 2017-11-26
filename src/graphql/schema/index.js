"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const programs_1 = require("../../mock/programs");
const Lang_1 = require("./Lang");
const Program_1 = require("./Program");
const Season_1 = require("./Season");
const log = { log: (error) => console.log(error) };
const RootQuery = `
type Query {
    hello: String
    lists : [Program]
    seasons(id: Int!): [Season]
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
];
const resolvers = {
    Query: {
        hello(root) {
            return "world";
        },
        lists(obj, args, context, info) {
            return programs_1.Programs;
        },
    },
};
const schema = graphql_tools_1.makeExecutableSchema({
    typeDefs,
    resolvers,
    logger: log,
});
exports.default = schema;

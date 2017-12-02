"use strict";
exports.__esModule = true;
var graphql_tools_1 = require("graphql-tools");
var Mocks_1 = require("../../mock/Mocks");
var Cartoon_1 = require("./Cartoon");
var Lang_1 = require("./Lang");
var Program_1 = require("./Program");
var Season_1 = require("./Season");
var log = { log: function (error) { return console.log(error); } };
var RootQuery = "\ntype Query {\n    lists : [Program]\n    seasons(programId: Int!): [Season]\n    season(programId: Int!, id: Int!): Season\n    contents(seasonId: String!) : [Content]\n}\n";
var SchemaDefinition = "\nschema {\n  query: Query\n}\n";
var typeDefs = [SchemaDefinition, RootQuery].concat(Program_1.Program, Lang_1.Lang, Season_1.Season, Cartoon_1.Content);
var resolvers = {
    Query: {
        lists: function (obj, args, context, info) {
            return Mocks_1.Programs;
        },
        seasons: function (obj, args, context, info) {
            var programId = args.programId;
            var seasons = Mocks_1.Seasons.filter(function (season) {
                return season.programId === programId;
            });
            return seasons;
        },
        season: function (obj, args, context, info) {
            var _a = args, programId = _a.programId, id = _a.id;
            var seasons = Mocks_1.Seasons.filter(function (season) {
                return season.programId === programId;
            });
            return seasons[id];
        },
        contents: function (obj, args, context, info) {
            var seasonId = args.seasonId;
            var contents = Mocks_1.Contents.filter(function (content) {
                return content.seasonId === seasonId;
            });
            return contents;
        }
    },
    Content: {
        season: function (content) {
            var seasons = Mocks_1.Seasons.filter(function (season) {
                return season.id === content.seasonId;
            });
            return seasons[0];
        }
    }
};
var schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers,
    logger: log
});
exports["default"] = schema;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_tools_1 = require("graphql-tools");
const Mocks_1 = require("../../mock/Mocks");
const Cartoon_1 = require("./Cartoon");
const Lang_1 = require("./Lang");
const Program_1 = require("./Program");
const Season_1 = require("./Season");
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
            const { seasonId } = args;
            if (seasonId) {
                const contents = Mocks_1.Contents.filter((content) => {
                    return content.seasonId === seasonId;
                });
                return contents;
            }
            else {
                return Mocks_1.Contents;
            }
        },
        content(obj, args, context, info) {
            const { episode } = args;
            if (episode) {
                const contents = Mocks_1.Contents.filter((content) => {
                    return content.epNo === episode;
                });
                return contents[0];
            }
            else {
                return null;
            }
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

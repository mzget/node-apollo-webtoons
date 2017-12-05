import { makeExecutableSchema, mockServer } from "graphql-tools";

import {
    Programs as MockProgram,
    Seasons as MockSeason,
    Contents as MockContent,
} from "../../mock/Mocks";
import { Content } from "./Cartoon";
import { Lang } from "./Lang";
import { Program } from "./Program";
import { Season } from "./Season";

/** resolver fucntions */
import programsResolver, { findPrograms } from "../../routes/programs";
import seasonResolver, { findItems as FindSeason } from "../../routes/seasons";
import contentResolver, { findContent, findContents } from "../../routes/contents";

const log = { log: (error: string | Error) => console.log(error) };

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
const typeDefs = [SchemaDefinition, RootQuery,
    ...Program,
    ...Lang,
    ...Season,
    ...Content,
];
const resolvers = {
    Query: {
        lists(obj, args, context, info) {
            return findPrograms();
        },
        async seasons(obj, args, context, info) {
            const { programId } = args as { programId: string };
            const seasons = await FindSeason(programId);
            return seasons;
        },
        async season(obj, args, context, info) {
            const { programId, id } = args as { programId: string, id: number };
            const seasons = await FindSeason(programId);
            return seasons[id];
        },
        async contents(obj, args, context, info) {
            const { seasonId, programId } = args as { seasonId: string, programId: string };
            if (programId || seasonId) {
                const docs = await findContents(programId, seasonId);
                return docs;
            } else {
                return null;
            }
        },
        async content(obj, args, context, info) {
            const { episode } = args as { episode: number };
            if (episode) {
                const docs = await findContent(episode);
                return docs[0];
            } else {
                return null;
            }
        },
    },
    Content: {
        season: (content) => {
            const seasons = MockSeason.filter((season) => {
                return season.id === content.seasonId;
            });
            return seasons[0];
        },
    },
    Season: {
        program: async (season) => {
            const programs = await findPrograms();
            const results = programs.filter((program) => {
                return program._id.toString() === season.programId.toString();
            });

            return await results[0];
        },
    },
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    logger: log,
});

export default schema;

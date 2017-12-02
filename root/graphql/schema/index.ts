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

const log = { log: (error: string | Error) => console.log(error) };

const RootQuery = `
type Query {
    lists : [Program]
    seasons(programId: Int!): [Season]
    season(programId: Int!, id: Int!): Season
    contents(seasonId: String!) : [Content]
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
            return MockProgram;
        },
        seasons(obj, args, context, info) {
            const { programId } = args as { programId: number };
            const seasons = MockSeason.filter((season) => {
                return season.programId === programId;
            });
            return seasons;
        },
        season(obj, args, context, info) {
            const { programId, id } = args as { programId: number, id: number };
            const seasons = MockSeason.filter((season) => {
                return season.programId === programId;
            });
            return seasons[id];
        },
        contents(obj, args, context, info) {
            const { seasonId } = args as { seasonId: string };
            const contents = MockContent.filter((content) => {
                return content.seasonId === seasonId;
            });
            return contents;
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
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    logger: log,
});

export default schema;

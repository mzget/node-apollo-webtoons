import { makeExecutableSchema, mockServer } from "graphql-tools";

import {
    Programs as MockProgram,
    Seasons as MockSeason,
} from "../../mock/Mocks";
import { Cartoon } from "./Cartoon";
import { Lang } from "./Lang";
import { Program } from "./Program";
import { Season } from "./Season";

const log = { log: (error: string | Error) => console.log(error) };

const RootQuery = `
type Query {
    hello: String
    lists : [Program]
    seasons(programId: Int!): [Season]
    season(programId: Int!, id: Int!): Season
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
];
const resolvers = {
    Query: {
        hello(root) {
            return "world";
        },
        lists(obj, args, context, info) {
            return MockProgram;
        },
        seasons(obj, args: { programId: number }, context, info) {
            const seasons = MockSeason.filter((season) => {
                return season.programId === args.programId;
            });
            return seasons;
        },
        season(obj, args: { programId: number, id: number }, context, info) {
            const seasons = MockSeason.filter((season) => {
                return season.programId === args.programId;
            });
            return seasons[args.id];
        },
    },
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    logger: log,
});

export default schema;

import { makeExecutableSchema } from "graphql-tools";

import { Programs as MockProgram } from "../../mock/programs";
import { Cartoon } from "./Cartoon";
import { Lang } from "./Lang";
import { Program } from "./Program";
import { Season } from "./Season";

const log = { log: (error: string | Error) => console.log(error) };

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
    },
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    logger: log,
});

export default schema;

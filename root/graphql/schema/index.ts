import {
    // Programs as MockProgram,
    // Seasons as MockSeason,
    // Contents as MockContent,
} from "../../mock/Mocks";

import { Content } from "./content";
import { Lang } from "./lang";
import { Program } from "./program";
import { Season } from "./season";

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

export const typeDefs = [
    SchemaDefinition,
    RootQuery,
    Mutation,
    ...Program,
    ...Lang,
    ...Season,
    ...Content,
];

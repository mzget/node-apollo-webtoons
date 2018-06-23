import {
    // Programs as MockProgram,
    // Seasons as MockSeason,
    // Contents as MockContent,
} from "../../mock/Mocks";

import { Content } from "./cartoon";
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

const SchemaDefinition = `
    schema {
    query: Query
    }
`;

export const typeDefs = [SchemaDefinition, RootQuery,
    ...Program,
    ...Lang,
    ...Season,
    ...Content,
];

import { makeExecutableSchema, mockServer, IExecutableSchemaDefinition } from "graphql-tools";

import { typeDefs } from "./schema";
import {
    // Programs as MockProgram,
    // Seasons as MockSeason,
    Contents as MockContent,
} from "../mock/Mocks";

/** resolver fucntions */
import { findPrograms } from "./resolver/programResolvers";
import * as seasonResolves from "./resolver/seasonResolvers";
import { findContent, findContents, updateContent } from "./resolver/contentResolvers";

const resolvers = {
    Query: {
        lists(obj, args, context, info) {
            return findPrograms();
        },
        async seasons(obj, args, context, info) {
            const { programId } = args as { programId: string };
            const seasons = await seasonResolves.findItems(programId);
            return seasons;
        },
        async season(obj, args, context, info) {
            const { programId, id } = args as { programId: string, id: number };
            const seasons = await seasonResolves.findSeasonByNumber(id);
            return seasons[0];
        },
        async contents(obj, args, context, info) {
            const { seasonNo, programId } = args as { seasonNo: number, programId: string };

            let seasonInfo = {} as any;
            if (seasonNo) {
                const seasons = await seasonResolves.findSeasonByNumber(seasonNo);
                seasonInfo = seasons[0];
            }
            if (programId || seasonNo) {
                const docs = await findContents(programId, seasonInfo._id);
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
    Mutation: {
        content: async (obj, { fields }, context, info) => {
            try {
                const result = await updateContent(fields);
                return JSON.stringify(result);
            } catch (ex) {
                return Promise.reject(ex);
            }
        },
    },
    Content: {
        season: async (content) => {
            const seasons = await seasonResolves.findItems(content.programId);
            const results = seasons.filter((season) => {
                return `${season._id}` === `${content.seasonId}`;
            });
            return results[0];
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

// const logger = { log: (error: string | Error) => console.log(error) };
const executeSchema = { typeDefs, resolvers } as IExecutableSchemaDefinition;
const schema = makeExecutableSchema(executeSchema);

export default schema;

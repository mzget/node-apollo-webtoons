import { makeExecutableSchema, mockServer } from "graphql-tools";

import { typeDefs } from "./schema";

/** resolver fucntions */
import { findPrograms } from "../routes/programs";
import seasonResolver, { findItems as FindSeason } from "../routes/seasons";
import contentResolver, { findContent, findContents } from "../routes/contents";

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
        season: async (content) => {
            const seasons = await FindSeason(content.programId);
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

const log = { log: (error: string | Error) => console.log(error) };

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    logger: log,
});

export default schema;

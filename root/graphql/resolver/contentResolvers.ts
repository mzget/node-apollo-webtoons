import * as mongodb from "mongodb";
const { ObjectID } = mongodb;

import { getClient, database } from "../../dbClient";
import { dbCollections } from "../../config";

interface IContent {
    name: { th: string, en: string; };
    programId: string;
    seasonId: string;
    src: string;
    epName: { th: string, en: string; };
    epNo: number;
}

export async function findContent(episode: number) {
    const client = await getClient();
    const collection = client.db(database).collection(dbCollections.CONTENTS);

    const docs = await collection.find({ epNo: episode }).limit(1).toArray();

    return docs;
}

export async function findContents(programId: string, seasonId: string) {
    const client = await getClient();
    const collection = client.db(database).collection(dbCollections.CONTENTS);

    const docs = await collection.find({ programId: new ObjectID(programId.toString()) }).sort({ epNo: 1 }).toArray();

    return docs;
}

export async function updateContent(data: IContent) {
    const client = await getClient();
    const collection = client.db(database).collection(dbCollections.CONTENTS);

    await collection.createIndex({ seasonId: 1 });
    await collection.createIndex({ epNo: 1 });

    const update = {
        epNo: data.epNo,
        epName: data.epName,
        src: data.src,
        name: data.name,
        programId: new ObjectID(data.programId),
        seasonId: new ObjectID(data.seasonId),
    };

    const writeOps = await collection.update({ epNo: data.epNo }, {
        $set: update,
    }, { upsert: true });

    return writeOps.result;
}

import { getClient, database } from "../dbClient";
import { dbCollections } from "../config";

export async function findPrograms() {
    const client = await getClient();
    const collection = client.db(database).collection(dbCollections.PROGRAMS);

    const docs = await collection.find({}).toArray();

    return docs;
}

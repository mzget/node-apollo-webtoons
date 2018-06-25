
import { getClient, database } from "../../dbClient";
import { dbCollections } from "../../config";
import { ObjectId } from "mongodb";

export async function findItems(programId: string) {
    const client = await getClient();
    const collection = client.db(database).collection(dbCollections.SEASONS);

    const docs = await collection.find({ programId: new ObjectId(programId.toString()) }).sort({ no: 1 }).toArray();

    return docs;
}

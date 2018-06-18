import * as express from "express";
import * as mongodb from "mongodb";

import { getClient, database } from "../dbClient";
import { dbCollections } from "../config";

const router = express.Router();
const { ObjectID } = mongodb;

/* GET users listing. */
router.get("/", (req, res, next) => {
    res.status(200).json({ title: "webtoons contents" });
});

export async function findPrograms() {
    const client = await getClient();
    const collection = client.db(database).collection(dbCollections.PROGRAMS);

    const docs = await collection.find({}).toArray();

    return docs;
}

export default router;

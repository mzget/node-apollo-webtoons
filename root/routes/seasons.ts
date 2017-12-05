import * as express from "express";
import * as mongodb from "mongodb";

import { getAppDb } from "../dbClient";
import { dbCollections } from "../config";
import { ObjectId } from "bson";

const router = express.Router();
const { ObjectID } = mongodb;

/* GET users listing. */
router.get("/", (req, res, next) => {
    res.status(200).json({ title: "webtoons contents" });
});

export async function findItems(programId: string) {
    const db = await getAppDb();
    const collection = db.collection(dbCollections.SEASONS);

    const docs = await collection.find({ programId: new ObjectId(programId.toString()) }).toArray();

    return docs;
}

export default router;

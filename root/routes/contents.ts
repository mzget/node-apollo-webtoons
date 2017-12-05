import * as express from "express";
import * as mongodb from "mongodb";

import { getAppDb } from "../dbClient";
import { dbCollections } from "../config";

const router = express.Router();

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.status(200).json({ title: "webtoons contents" });
});

export async function findContent(episode: number) {
  const db = await getAppDb();
  const collection = db.collection(dbCollections.CONTENTS);

  await collection.createIndex({ epNo: 1 });

  const docs = await collection.find({ epNo: episode }).limit(1).toArray();

  return docs;
}

export async function findContents(seasonId: string) {
  const db = await getAppDb();
  const collection = db.collection(dbCollections.CONTENTS);

  await collection.createIndex({ seasonId: 1 });

  const docs = await collection.find({ seasonId: seasonId.toString() }).toArray();

  return docs;
}

export default router;

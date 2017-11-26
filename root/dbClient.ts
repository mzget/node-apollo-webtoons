import mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
import { Config } from "./config";

let appDB = Object.create(null) as mongodb.Db;
export const getAppDb = () => {
    return appDB;
};
export async function InitDatabaseConnection() {
    const opt = { reconnectTries: Number.MAX_VALUE } as mongodb.MongoClientOptions;
    appDB = await MongoClient.connect(Config.dbHost, opt);

    appDB.on("close", (err: any) => {
        console.error("close", err);
    });

    appDB.on("error", (err: any) => {
        console.error("error", err);
    });

    appDB.on("timeout", (err: any) => {
        console.error("timeout", err);
    });

    appDB.on("reconnect", (server: any) => {
        console.log("reconnect", server);
    });

    return appDB;
}

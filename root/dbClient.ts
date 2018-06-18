import mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
import { Config } from "./config";
import * as nconf from 'nconf';

// Read in keys and secrets. Using nconf use can set secrets via
// environment variables, command-line arguments, or a keys.json file.
nconf.argv().env().file('keys.json');

const user = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');
const port = nconf.get('mongoPort');

let uri = `mongodb://${user}:${pass}@${host}:${port}`;
if (nconf.get('mongoDatabase')) {
    uri = `${uri}/${nconf.get('mongoDatabase')}`;
}
console.log(uri);

let appDB = Object.create(null) as mongodb.Db;
export const getAppDb = () => {
    return appDB;
};
export async function InitDatabaseConnection() {
    const opt = { reconnectTries: Number.MAX_VALUE } as mongodb.MongoClientOptions;
    appDB = await MongoClient.connect(uri, opt);

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

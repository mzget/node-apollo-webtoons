import * as mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;
import * as nconf from "nconf";
// Read in keys and secrets. Using nconf use can set secrets via
// environment variables, command-line arguments, or a keys.json file.
nconf.argv().env().file("keys.json");

const user = nconf.get("mongoUser");
const pass = nconf.get("mongoPass");
const host = nconf.get("mongoHost");
const port = nconf.get("mongoPort");
export const database = nconf.get("mongoDatabase");

let uri = `mongodb://${user}:${pass}@${host}:${port}`;
if (database) {
    uri = `${uri}/${database}`;
}

let client = Object.create(null) as mongodb.MongoClient;
export const getClient = () => {
    return client;
};
export async function InitDatabaseConnection() {
    const opt = { reconnectTries: Number.MAX_VALUE } as mongodb.MongoClientOptions;

    console.log(uri);

    client = await MongoClient.connect(uri, opt);

    client.on("close", (err: any) => {
        console.error("close", err);
    });

    client.on("error", (err: any) => {
        console.error("error", err);
    });

    client.on("timeout", (err: any) => {
        console.error("timeout", err);
    });

    client.on("reconnect", (server: any) => {
        console.log("reconnect", server);
    });

    return client;
}

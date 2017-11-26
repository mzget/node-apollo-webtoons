"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const devConfig = {
    dbHost: "mongodb://localhost:27017/webcartoons",
    apikey: "webcartoons",
};
const masterConfig = {
    dbHost: "mongodb://localhost:27017/webcartoons",
    apikey: "webcartoons",
};
const getConfig = () => {
    const conf = (process.env.NODE_ENV === `production`) ? masterConfig : devConfig;
    return conf;
};
exports.Config = getConfig();
exports.default = exports.Config;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const devConfig = {
    dbHost: "mongodb://mzget:mzget1234@chitchats.ga:27017/test-webtoons",
    apikey: "webcartoons",
};
const getConfig = () => {
    const conf = (process.env.NODE_ENV === `production`) ? devConfig : devConfig;
    return conf;
};
exports.dbCollections = {
    CONTENTS: "contents",
    PROGRAMS: "programs",
    SEASONS: "seasons",
};
exports.Config = getConfig();
exports.default = exports.Config;

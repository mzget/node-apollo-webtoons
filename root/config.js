"use strict";
exports.__esModule = true;
var devConfig = {
    dbHost: "mongodb://mzget:mzget1234@chitchats.ga:27017/test-webtoons",
    apikey: "webcartoons"
};
var masterConfig = {
    dbHost: "mongodb://mzget:mzget1234@chitchats.ga:27017/test-webtoons",
    apikey: "webcartoons"
};
var getConfig = function () {
    var conf = (process.env.NODE_ENV === "production") ? masterConfig : devConfig;
    return conf;
};
exports.Config = getConfig();
exports["default"] = exports.Config;

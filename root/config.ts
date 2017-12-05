const devConfig = {
    dbHost: "mongodb://mzget:mzget1234@chitchats.ga:27017/test-webtoons",
    apikey: "webcartoons",
};

const masterConfig = {
    dbHost: "mongodb://mzget:mzget1234@chitchats.ga:27017/test-webtoons",
    apikey: "webcartoons",
};

const getConfig = () => {
    const conf = (process.env.NODE_ENV === `production`) ? masterConfig : devConfig;

    return conf;
};

export const dbCollections = {
    CONTENTS: "contents",
};

export const Config = getConfig();
export default Config;

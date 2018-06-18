const devConfig = {
    dbHost: "mongodb://mzget:mzget1234@chitchats.ga:27017/test-webtoons",
    apikey: "webcartoons",
};

const getConfig = () => {
    const conf = (process.env.NODE_ENV === `production`) ? devConfig : devConfig;

    return conf;
};

export const dbCollections = {
    CONTENTS: "contents",
    PROGRAMS: "programs",
    SEASONS: "seasons",
};

export const Config = getConfig();
export default Config;

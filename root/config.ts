const devConfig = {
    dbHost: "mongodb://localhost:27017/webcartoons",
    apikey: "webcartoons",
}

const masterConfig = {
    dbHost: "mongodb://localhost:27017/webcartoons",
    apikey: "webcartoons",
}

const getConfig = () => {
    const conf = (process.env.NODE_ENV === `production`) ? masterConfig : devConfig;

    return conf;
}

export const Config = getConfig();
export default Config;

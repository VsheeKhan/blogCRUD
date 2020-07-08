let appConfig = {};

appConfig.port = 3000;
appConfig.allowedCrosOrigin = "*";
appConfig.env = "dev";
appConfig.db = {
    uri: 'mongodb://localhost:27017/blogAppDB'
};

appConfig.apiVersion = '/api/v1';

module.exports = {
    port: appConfig.port,
    allowedCrosOrigin: appConfig.allowedCrosOrigin,
    enviroment: appConfig.env,
    db: appConfig.db,
    apiVersion: appConfig.apiVersion
}
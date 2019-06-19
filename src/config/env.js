const configs = require ('../sequelize/config/config');

const {NODE_ENV = 'development', DB_ENV = 'development'} = process.env;
const env = NODE_ENV;
const isProduction = env === 'production';
const isTest = env === 'test';
const isDevelopment = env === 'development';

let databaseUrl;
if (isProduction)
  databaseUrl = process.env[configs.production.use_env_variable];
if (!isProduction) databaseUrl = process.env[configs[DB_ENV].use_env_variable];

module.exports = {
  env,
  isProduction,
  isDevelopment,
  isTest,
  envDatabaseUrl: databaseUrl,
};

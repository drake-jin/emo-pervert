
const YAML = require('yamljs')


// load yaml files
// __dirname) === output: '/'
const devConfigEnv = YAML.load('config/env.yml');
const devConfigTables = YAML.load('config/tables.yml');
const devConfigHandlers = YAML.load('config/handlers.yml');

export default {
  devConfigEnv,
  devConfigTables,
  devConfigHandlers,
};

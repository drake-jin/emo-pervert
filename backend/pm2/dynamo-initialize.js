
const AWS = require('aws-sdk');
const YAML = require('yamljs')
const empty = require('is-empty')


// load yaml files
const devConfigEnv = YAML.load(__dirname + '/../config/env.yml')
const devConfigTables = YAML.load(__dirname + '/../config/tables.yml')
const devConfigTablesKeys = Object.keys(devConfigTables)

const ENV = 'dev'

const options = {
  region: devConfigEnv.DynamoDB[ENV].region,
  endpoint: devConfigEnv.DynamoDB[ENV].endpoint,
}

AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: devConfigEnv.Profile })
const dynamoDB = new AWS.DynamoDB(options);

const app = async () => {

  // get Tables on local dynamoDB
  const { TableNames: listTables } = await new Promise((resolve, reject) => {
    dynamoDB.listTables({}, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })

  const willDeleteTables = listTables.filter(table =>
    devConfigTablesKeys
      .filter(configTable => configTable === table).length >= 1 // 일치하는게 없다면 지운다.
  )

  // delete tables except defined config/tables.yml
  const deleteTablesPromise = willDeleteTables.map(item => new Promise((resolve, reject) => {
    dynamoDB.deleteTable({ TableName: item }, (err, data) => {
      if (empty(err)) reject(err)
      resolve(data)
    })
  }))
  await Promise.all(deleteTablesPromise)

  // create tables only defined config/tables.yml
  const createTablesPromise = devConfigTablesKeys.map(item => new Promise((resolve, reject) => {
    dynamoDB.createTable(devConfigTables[item].Properties, (err, data) => {
      if (empty(err)) reject(err)
      resolve(data)
    })

  }))
  const result = await Promise.all(createTablesPromise)
}

app()
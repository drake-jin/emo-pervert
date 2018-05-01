
const AWS = require('aws-sdk');
const YAML = require('yamljs')

const devConfigEnv = YAML.load(__dirname + '/../config/env.yml')
const ENV = 'dev'

AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: devConfigEnv.Profile })

const options = {
  region: devConfigEnv.DynamoDB[ENV].hostname,
  endpoint: `${devConfigEnv.DynamoDB[ENV].host}:${devConfigEnv.DynamoDB[ENV].port}`,
}

const dynamoDb = new AWS.DynamoDB.DocumentClient(options);

const params = {
  TableName: 'REWARD-TODO',
};

// async await을 이용하여 로컬 테스트 환경을 만들자.
dynamoDb.scan(params, (error, result) => {
  // handle potential errors
  if (error) {
    console.error(error);
    console.log({
      statusCode: error.statusCode || 501,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t fetch the todos.',
    });
    return;
  }

  // create a response
  const response = {
    statusCode: 200,
    body: JSON.stringify(result.Items),
  };
  console.log(response)
});

console.log(1)
console.log(options)
console.log(2)

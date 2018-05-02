
import { DynamoDB } from 'aws-sdk';

const options: any = {};

/* When it's in Development */
if (process.env.NODE_ENV === 'dev') {
  options.region = 'localhost';
  options.endpoint = 'http://localhost:28000';
}

const dynamoDb = new DynamoDB.DocumentClient(options);


export default dynamoDb
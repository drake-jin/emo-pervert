import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';

type Body = {
  message: string;
  data: object;
}
type Response = {
  statusCode: number;
  body: Body;
  
}

const createResponse = (statusCode: number, body: Body) => ({ statusCode, body: JSON.stringify(body) });

export const createPoet: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  const body: Body = { message: 'poets.createPoet', data: { a: 1, b: 2 } }
  cb(null, createResponse(200, body));
}

export const listPoet: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  const body: Body = { message: 'poets.listPoet', data: { a: 1, b: 2 } }
  cb(null, createResponse(200, body));
}

export const detailPoet: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  const body: Body = { message: 'poets.detailPoet', data: { a: 1, b: 2 } }
  cb(null, createResponse(200, body));
}

export const updatePoet: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  const body: Body = { message: 'poets.updatePoet', data: { a: 1, b: 2 } }
  cb(null, createResponse(200, body));
}

export const deletePoet: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  const body: Body = { message: 'poets.deletePoet', data: { a: 1, b: 2 } }
  cb(null, createResponse(200, body));
}


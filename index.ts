import {APIGatewayEvent, APIGatewayProxyResult, Context} from 'aws-lambda';

/**
 * Follow the guide https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html
 * @param event
 * @param context
 */
var  handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event)}`);
  console.log(`Context: ${JSON.stringify(context)}`);
  return {
    statusCode: 200,
    body: 'Hello World. smarter work and gain more wealth',
  };
};


var shopping = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event)}`);
  console.log(`Context: ${JSON.stringify(context)}`);
  return {
    statusCode: 200,
    body: 'Big discount',
  };
};

var ho = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event)}`);
  console.log(`Context: ${JSON.stringify(context)}`);
  return {
    statusCode: 200,
    body: 'joy',
  };
};

exports.holiday = ho
exports.shopping = shopping
exports.handler = handler


var hodfq = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event)}`);
  console.log(`Context: ${JSON.stringify(context)}`);
  return {
    statusCode: 200,
    body: '12344 joy a',
  };
};
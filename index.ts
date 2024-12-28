import {APIGatewayEvent, APIGatewayProxyResult, Context} from 'aws-lambda';

/**
 * Follow the guide https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html
 * @param event
 * @param context
 */


export const shopping = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event)}`);
  console.log(`Context: ${JSON.stringify(context)}`);
  return {
    statusCode: 200,
    body: 'Big discount for the holidays!',
  };
};

export const goodfood = async (
  event: APIGatewayEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.log(`Event: ${JSON.stringify(event)}`);
  console.log(`Context: ${JSON.stringify(context)}`);
  return {
    statusCode: 200,
    body: 'Big joy',
  };
};


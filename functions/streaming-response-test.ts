import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const createRange = (start: number, end: number) => {
  const range = [];
  for (let i = start; i <= end; i++) {
    range.push(i);
  }
  return range;
};

const txtData = createRange(1, 1000000).join(', ');

const baseHandler = async (_event: APIGatewayProxyEventV2, responseStream: awslambda.ResponseStream): Promise<any> => {
  const requestStream = Readable.from(Buffer.from(txtData));
  responseStream.setContentType('text/plain');
  await pipeline(requestStream, responseStream);
}

export const handler = awslambda.streamifyResponse(baseHandler);
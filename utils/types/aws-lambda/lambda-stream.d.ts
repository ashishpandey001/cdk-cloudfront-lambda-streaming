import { APIGatewayProxyEventV2, Context, Handler } from "aws-lambda";
import { Writable } from "node:stream";

declare global {
  export namespace awslambda {
    export namespace HttpResponseStream {
      function from(writable: Writable, metadata: any): Writable;
    }
    
    export type ResponseStream = Writable & {
      setContentType(type: string): void;
    }

    export type StreamifyHandler = (event: APIGatewayProxyEventV2, responseStream: ResponseStream, context: Context) => Promise<any>;

    export function streamifyResponse(handler: StreamifyHandler): Handler<APIGatewayProxyEventV2>;
  }
}

import { Stack, StackProps, Duration, CfnOutput } from 'aws-cdk-lib/core';
import { FunctionUrl, Runtime, FunctionUrlAuthType, InvokeMode } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class FnUrlStack extends Stack {
  fnUrl: FunctionUrl;
  
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const fn = new NodejsFunction(this, 'StreamingResponseFn', {
      runtime: Runtime.NODEJS_20_X,
      entry: 'functions/streaming-response-test.ts',
      timeout: Duration.minutes(5),
    });

    this.fnUrl = fn.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      invokeMode: InvokeMode.RESPONSE_STREAM,
    });

    new CfnOutput(this, 'LambdaFnURLEndpoint', {
      value: this.fnUrl.url
    });
  }
}

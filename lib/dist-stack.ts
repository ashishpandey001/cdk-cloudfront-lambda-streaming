import { StackProps, Stack, CfnOutput } from 'aws-cdk-lib/core';
import { Distribution, CachePolicy, HttpVersion } from 'aws-cdk-lib/aws-cloudfront';
import { FunctionUrlOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { FunctionUrl } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

interface DistStackProps extends StackProps {
  fnUrl: FunctionUrl;
}

export class DistStack extends Stack {
  constructor(scope: Construct, id: string, props: DistStackProps) {
    super(scope, id, props);

    const cdnDistribution = new Distribution(this, 'CloudfrontDist', {
      defaultBehavior: {
        origin: new FunctionUrlOrigin(props.fnUrl),
        cachePolicy: CachePolicy.CACHING_DISABLED,
      },
      enableLogging: true,
      httpVersion: HttpVersion.HTTP2_AND_3,
      enableIpv6: true,
    });

    new CfnOutput(this, 'DistributionDomainName', {
      value: cdnDistribution.domainName
    });
  }
}

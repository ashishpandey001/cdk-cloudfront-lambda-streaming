import { App } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { FnUrlStack } from '../lib/fnurl-stack';
import { DistStack } from '../lib/dist-stack';

test('Creates a Cloudfront distribution with specific properties and returns the domain name', () => {
  const app = new App();
  const fnUrlStack = new FnUrlStack(app, 'FnUrlStack');
  const distStack = new DistStack(app, 'DistStack', { fnUrl: fnUrlStack.fnUrl });
  const template = Template.fromStack(distStack);

  template.hasResourceProperties('AWS::CloudFront::Distribution', {
    DistributionConfig: {
      Enabled: true,
      HttpVersion: 'http2and3',
      IPV6Enabled: true,
    }
  });

  template.hasOutput('DistributionDomainName', {
    Value: Match.anyValue()
  })
});

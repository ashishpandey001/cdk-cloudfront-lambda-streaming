import { App } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { FnUrlStack } from '../lib/fnurl-stack';

test('Creates a Lambda with a Fn URL that is publicly accessible', () => {
  const app = new App();
  const stack = new FnUrlStack(app, 'FnUrlStack');
  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::Lambda::Function', {
    Runtime: 'nodejs20.x',
  });

  template.hasResourceProperties('AWS::Lambda::Url', {
    AuthType: 'NONE',
    InvokeMode: 'RESPONSE_STREAM',
  });

  template.hasOutput('LambdaFnURLEndpoint', { Value: Match.anyValue() });
});

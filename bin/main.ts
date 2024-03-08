#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { FnUrlStack } from '../lib/fnurl-stack';
import { DistStack } from '../lib/dist-stack';

const app = new App();

const fnUrlStack = new FnUrlStack(app, 'FnUrlStack');
new DistStack(app, 'DistStack', { fnUrl: fnUrlStack.fnUrl });
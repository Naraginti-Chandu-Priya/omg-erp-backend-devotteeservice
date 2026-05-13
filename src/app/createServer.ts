import {
  Server,
  reportDebug,
  SecretManagerOptions,
  Endpoint,
  EndpointAuthType
} from 'node-server-engine';
import cookieParser from 'cookie-parser';
import * as endpoints from '../endpoints';

import express, { RequestHandler } from 'express';
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as path from 'path';
import yaml from 'js-yaml';

const swaggerFilePath = path.resolve(__dirname, '../../docs/index.yaml');
const swaggerContent = fs.readFileSync(swaggerFilePath, 'utf8');
const swaggerDocument = yaml.load(swaggerContent) as Record<
  string,
  string | number | boolean | object | null
>;

reportDebug.setNameSpace('devotee-service');

export function createServer(): Server {
  const secretManagerConfig: SecretManagerOptions = {
    enabled: process.env.NODE_ENV === 'production',
    projectId: process.env.GCP_PROJECT_ID,
    cache: true,
    fallbackToEnv: true,
    secrets: []
  };

  const swaggerHandlers = swaggerUi.serve.map((handler) => ({
    path: '/api-docs',
    middleware: handler as RequestHandler
  }));

  return new Server({
    globalMiddleware: [
      express.json(),
      express.urlencoded({ extended: true }),
      cookieParser(),
      ...swaggerHandlers,
      {
        path: '/api-docs',
        middleware: swaggerUi.setup(swaggerDocument) as RequestHandler
      }
    ],
    endpoints: Object.values(endpoints) as Endpoint<EndpointAuthType>[],
    secretManager: secretManagerConfig
  });
}

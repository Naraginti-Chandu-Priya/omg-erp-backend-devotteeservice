import { Server, reportDebug, SecretManagerOptions } from 'node-server-engine';
import cookieParser from 'cookie-parser';
import * as endpoints from '../endpoints';


import express from 'express';
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import * as path from 'path';
import yaml from 'js-yaml';

const swaggerFilePath = path.resolve(__dirname, '../../docs/index.yaml');
const swaggerContent = fs.readFileSync(swaggerFilePath, 'utf8');
const swaggerDocument = yaml.load(swaggerContent) as Record<string, unknown>;

reportDebug.setNameSpace('devotee-service');

export function createServer(): Server {
  const secretManagerConfig: SecretManagerOptions = {
    enabled: process.env.NODE_ENV === 'production',
    projectId: process.env.GCP_PROJECT_ID,
    cache: true,
    fallbackToEnv: true,
    secrets: []
  };

  return new Server({
    globalMiddleware: [
      express.json(),
      express.urlencoded({ extended: true }),
      cookieParser(),
      {
        path: '/api-docs',
        middleware: swaggerUi.serve
      },
      {
        path: '/api-docs',
        middleware: swaggerUi.setup(swaggerDocument) as any
      }
    ],
    endpoints: Object.values(endpoints) as any,
    secretManager: secretManagerConfig
  });
}

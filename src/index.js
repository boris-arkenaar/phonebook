import express from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import next from 'next';
import path from 'path';
import swaggerTools from 'swagger-tools';
import yaml from 'js-yaml';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const dbUrl = process.env.DB
  || 'mongodb://boris:N{Z4scavBCnTVykibYRD@ds037581.mlab.com:37581/phonebook-db';

const swaggerPath = path.join(__dirname, 'api', 'swagger.yaml');
const swaggerDoc = yaml.safeLoad(fs.readFileSync(swaggerPath, 'utf8'));
const swaggerRouterConf = {
  controllers: './src/api',
  useStubs: dev
};
const mongooseConf = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const app = next({ dev });
const appHandler = app.getRequestHandler();
const server = express();

function main() {
  swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
    // Interpret Swagger resources and attach metadata to request - must be
    // first in swagger-tools middleware chain
    server.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    server.use(middleware.swaggerValidator());

    // Route validated requests to appropriate controller
    server.use(middleware.swaggerRouter(swaggerRouterConf));

    // Serve the Swagger documents and Swagger UI
    server.use(middleware.swaggerUi());

    // Connect to the database
    mongoose.connect(dbUrl, mongooseConf);

    // Delegate all other requests to Next.js
    server.get('*', appHandler);

    // Start the server
    server.listen(port, () => {
      console.log(
        'Your server is listening on port %d (http://localhost:%d)',
        port,
        port
      );
    });
  });
}

async function setup() {
  await app.prepare();
  main();
}

setup();

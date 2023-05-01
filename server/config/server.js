import Express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from './logger';

const jsonRefs = require('json-refs');

const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger/main.json');

const { resolveRefs } = jsonRefs;

const { error } = logger('Server App', '');
const whitelist = ['https://www.abc.com', 'https://abc.com'];

const corsOptions =
  process.env.NODE_ENV === 'production'
    ? {
        origin(origin, callback) {
          if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
        },
      }
    : undefined;

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    const app = new Express();
    app.set('appPath', `${root}client`);
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '1000kb' }));
    app.use(
      bodyParser.urlencoded({ extended: true, limit: process.env.REQUEST_LIMIT || '1000kb' }),
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '1000kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(Express.static(`${root}/public`));
    app.use(cors(corsOptions));

    this.app = app;
    this.swaggerDocFinal = {};
  }

  router(routes) {
    this.routes = routes;
    return this;
  }

  listen(port = process.env.PORT || 3000) {
    const welcome = p => () => {
      const msg = `up and running in ${
        process.env.NODE_ENV || 'development'
      } @: ${os.hostname()} on port: ${p}}`;
      // eslint-disable-next-line no-console
      console.info(msg);
      return msg;
    };

    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocFinal));

    this.routes(this.app);

    this.app.use((req, res) => res.status(404).send({ message: `${req.url} path not found.` }));
    this.app.use((err, req, res) => {
      error(err);
      return res.status(500).send({ error: err });
    });

    http.createServer(this.app).listen(port, welcome(port));
  }

  async setupSwagger() {
    const swaggerDoc = await this.multiFileSwagger(swaggerDocument);
    this.swaggerDocFinal = swaggerDoc;
  }

  async multiFileSwagger(root) {
    const options = {
      filter: ['relative'],
      loaderOptions: {
        processContent: (res, callback) => {
          callback(null, JSON.parse(res.text));
        },
      },
    };

    return resolveRefs(root, options).then(
      results => results.resolved,
      err => {
        console.log(err || err.stack);
      },
    );
  }
}

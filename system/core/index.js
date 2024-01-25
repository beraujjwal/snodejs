'use strict';
require('dotenv').config();
const chalk = require('chalk');

global.currentLoginUserId = 1;

global.log = function log(message) {
  if (process.env.APP_ENV !== 'production') console.log(chalk.green.bgWhite.bold(`✔ ${message}`));
}
global.info = function info(message) {
  if (process.env.APP_ENV !== 'production') console.log(chalk.green.bgWhite.bold(`✔ ${message}`));
}
global.echo = function echo(message) {
  if (process.env.APP_ENV !== 'production') console.log(chalk.green.bgWhite.bold(`✔ ${message}`));
}
global.error = function error(message) {
  if (process.env.APP_ENV !== 'production') console.log(chalk.red.bgWhite.bold(`✘ ${message}`));
}
global.warn = function warn(message) {
  if (process.env.APP_ENV !== 'production') console.log(chalk.red.bgWhite.bold(`✘ ${message}`));
}

log('Bootstrapping Application');
const express = require('express');
const { engine } = require('express-handlebars');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const Sentry = require('@sentry/node');

const i18n = require('../../config/i18n.config');
const winston = require('../../config/winston.config');
const { errorResponse } = require('./helpers/apiResponse');
const { consumerKafkaMessage } = require('../../libraries/consumer.library');  //Enable this line if you want to config kafkajs also with line no 94
const limiter = require('../../config/rateLimit.config');

const app = express();
let apiHitCount = 0;
let errorCount = 0;
if(process.env.SENTRY_DNS) {
  Sentry.init({
    dsn: process.env.SENTRY_DNS,
    environment: process.env.APP_ENV,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({
        app,
        // alternatively, you can specify the routes you want to trace:
        // router: someRouter,
      }),
    ],
    tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE),
    debug: Boolean(process.env.SENTRY_DEBUG)
  });
}

const hbs = engine({
  partialsDir: 'resources/views/layouts/partials',
  layoutsDir: 'resources/views/layouts/',
  defaultLayout: 'main',
  extname: '.hbs',
  //helpers: Specify helpers which are only registered on this instance.
  helpers: {
    getCurrentDate: () => new Date(),
    getFullName(firstName, lastName) { return `${firstName} ${lastName}`; },
  }
});

const corsOptions = {
  credentials: true,
  allowedHeaders: '*',
  origin: '*',
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static('public'))

app.engine('handlebars', hbs);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// i18n
app.use(i18n);

//Basic rate-limiting middleware for Express.
app.use(limiter);

//Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());

const PORT = parseInt(process.env.APP_PORT) || 5445;
const MODE = process.env.APP_ENV || 'development';

log(`Mode: ${MODE}`);
log(`Port: ${PORT}`);

require('./db.connection');

//don't show the log when it is test
if (process.env.APP_ENV === 'development') {
  app.use(logger('dev', { stream: winston.stream }));
}
if(process.env.SENTRY_DNS) app.use(Sentry.Handlers.requestHandler());
log('Mapping Routes');
if(process.env.SENTRY_DNS) app.use(Sentry.Handlers.tracingHandler());

const routers = require('../route');
//Route Prefixes
app.use('/', routers);

consumerKafkaMessage();

app.use(function (err, req, res, next) {

  let showErrorNumber = '';
  const code = err.code || err.statusCode;
  let errorMessage = err.toString();

  if(code == 500) {
    errorCount++;
    errorMessage = 'Internal Server error. Please try after sometime.';
    showErrorNumber = `No.- ${errorCount}`;
  }

  if (MODE !== 'test') {
    winston.error(
      `${showErrorNumber} - ${code || 500} - ${errorMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    );
  }

  if(process.env.SENTRY_DNS) Sentry.captureException(err);
  return res.status(code || 500).json(errorResponse(err, code || 500));
});

//Sentry.close().then(() => process.exit(0));
if(process.env.SENTRY_DNS) app.use(Sentry.Handlers.errorHandler());

module.exports = app;
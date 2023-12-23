'use strict';
require('dotenv').config();
const http = require('http');
const app = require('./system/core/');

const PORT = parseInt(process.env.APP_PORT) || 8080;
const httpServer = http.createServer(app);

httpServer.listen(PORT).on('error', (err) => {
  error(chalk.green.bgWhite.bold('✘ Application failed to start'));
  error(chalk.green.bgWhite.bold(`✘ Error: ${err.message}`));
  process.exit(0);
})
.on('listening', () => {
  log('Application Started');
});
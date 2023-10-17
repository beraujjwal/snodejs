'use strict';
require('dotenv').config();
const chalk = require('chalk');
const http = require('http');
const fs = require('fs');
const log = console.log;
const app = require('./system/core/');

const PORT = parseInt(process.env.APP_PORT) || 8080;
const httpServer = http.createServer(app);

httpServer.listen(PORT).on('error', (err) => {
  log(chalk.white.bgGreen.bold('✘ Application failed to start'));
  log(chalk.white.bgGreen.bold(`✘ Error: ${err.message}`));
  process.exit(0);
})
.on('listening', () => {
  log(chalk.white.bgGreen.bold('✔ Application Started'));
});
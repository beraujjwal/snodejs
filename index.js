'use strict';
require('dotenv').config();
const http = require('http');
const socketio = require('socket.io');

const app = require('./system/core');

const PORT = parseInt(process.env.APP_PORT) || 5445;
const httpServer = http.createServer(app);

const io = socketio(httpServer);

io.on('connection', client => {

  log(`New connection: ${client.id}`);

  client.on('event', data => { /* … */ });
  client.on('disconnect', () => { /* … */ });

  // client.emit('request', /* … */); // emit an event to the socket
  // io.emit('broadcast', /* … */); // emit an event to all connected sockets
  // client.on('reply', () => { /* … */ }); // listen to the event
});

httpServer.listen(PORT).on('error', (err) => {
  error('✘ Application failed to start');
  error(`✘ Error: ${err.message}`);
  process.exit(0);
})
.on('listening', () => {
  log('Application Started');
});
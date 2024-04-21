"use strict";
require("dotenv").config();
const http = require("http");

const cluster = require("cluster");
const { availableParallelism } = require("os");
const process = require("process");

const app = require("./system/core");
const { Server } = require("socket.io");
const { socket } = require("./socket/index");

// const numCPUs = 0; //availableParallelism();

// console.log("numCPUs", numCPUs);

const PORT = parseInt(process.env.APP_PORT) || 5445;

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  transports: ["websocket", "polling"],
  upgrade: false,
  maxHttpBufferSize: 1e8, // 100 MB we can upload to server (By Default = 1MB)
  pingTimeout: 60000, // increate the ping timeout
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTION"],
  },
});

socket(io);

// if (cluster.isPrimary) {
//   console.log(`Primary ${process.pid} is running`);

//   // Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//   });
// } else {
// Workers can share any TCP connection
// In this case it is an HTTP server
httpServer
  .listen(PORT)
  .on("error", (err) => {
    error("✘ Application failed to start");
    error(`✘ Error: ${err.message}`);
    process.exit(0);
  })
  .on("listening", () => {
    log("Application Started");
  });

//   console.log(`Worker ${process.pid} started`);
// }

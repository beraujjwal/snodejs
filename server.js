require( 'dotenv' ).config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const i18n = require('./config/i18n');
const multer = require('multer');
const session = require('express-session');
const flash = require('express-flash-messages')
const winston = require('winston')
const upload = multer();
//const logger = require('./system/core/services/logger')
//var flushSystem = require('./system/helpers/flushSystem')


console.log( '\x1b[32m%s\x1b[0m', '✔ Starting Application' );
const app = express();
var corsOptions = {
  origin: "*"
};

console.log( '\x1b[32m%s\x1b[0m', '✔ Bootstrapping Application' );
const router = express.Router();
/*const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)

function logRequest(req, res, next) {
    logger.info(req.url)
    next()
}
app.use(logRequest)

function logError(err, req, res, next) {
    logger.error(err)
    next()
}
app.use(logError)*/

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: parseInt(process.env.SESSION_EXPIRES_IN) }
}))



app.use(i18n);

app.use(flash());
//app.use(logger);

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './resources/views')
//Set view engine
app.set('view engine', 'pug')

// for parsing multipart/form-data
app.use(upload.array());

//set the path of the assets file to be used
//app.use('/assets',express.static(path.join(__dirname+'/public/assets/'))); 

app.use(express.static(path.join(__dirname, './public')));

// simple route
/*app.get("/", (req, res) => {
  res.json({ message: "Welcome to Ujjwal Bera application." });
});*/

const PORT = parseInt(process.env.APP_PORT) || 8080;
const MODE = process.env.APP_ENV || 'development';

console.log( '\x1b[32m%s\x1b[0m', `✔ Mode: ${MODE}` );
console.log( '\x1b[32m%s\x1b[0m', `✔ Port: ${PORT}` );
require('./system/core/route/route')(app, router);
console.log( '\x1b[32m%s\x1b[0m', '✔ Mapping Routes' );

app.use( '/api/*', ( req, res, next ) => {
    res.json({ message: "Page Not Found!!" });
});
app.use( '/*', ( req, res, next ) => {
    //res.json({ message: "Page Not Found!" });
    res.render('404', { title: '404 Page not found', msg: 'Uh oh snap! You are drive to the wrong way' })
});

// set port, listen for requests
app.listen( PORT ).on( 'error', ( err ) => {
    console.log( '\x1b[31m%s\x1b[0m', '✘ Application failed to start' );
    console.error( '\x1b[31m%s\x1b[0m', '✘', err.message );
    process.exit( 0 );
} ).on( 'listening', () => {
  console.log( '\x1b[32m%s\x1b[0m', '✔ Application Started' );
} );

'use strict';
require( 'dotenv' ).config();
var _ = require('lodash');	
var nodemailer = require('nodemailer');

var config = {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USERNAME, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD // generated ethereal password
    }
};
    
var transporter = nodemailer.createTransport(config);

var defaultMail = {
    from: process.env.DEFAULT_EMAIL,
    subject: process.env.DEFAULT_SUBJECT,
};





module.exports = function(mail){
    // use default setting
    mail = _.merge({}, defaultMail, mail);
    
    // send email
    transporter.sendMail(mail, function(error, info){
        if(error) return console.log(error);
        console.log('mail sent:', info.response);
    });
};
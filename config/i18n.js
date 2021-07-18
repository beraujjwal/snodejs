'use strict';
require( 'dotenv' ).config();
var i18n = require('i18n');
 
i18n.configure({
    // setup some locales
    locales:['en', 'bn', 'hi'],
    defaultLocale: 'bn',
    queryParameter: 'lang',
    // where to store json files
    directory: __dirname + '/../resources/locales',
    /*api: {
        '__': 'translate',  
        '__n': 'translateN' 
    },*/
    register: global
  
});
 
module.exports = async function(req, res, next) { 
    const headres = req.headers;
    i18n.init(req, res);
    var lang = headres['accept-language'];
    if(!headres['accept-language']) {
        var lang = 'en';
    }
    //console.log(`Current language is ${lang}`);
    i18n.setLocale(lang);
    return next();
};
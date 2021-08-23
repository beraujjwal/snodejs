'use strict';
const fs = require('fs');
const path = require('path');
const basePath = __dirname + '/../../../routes/';
const modules = __dirname + '/../../../modules/';
const basename = path.basename(__filename);


module.exports = function(app, router) {
    fs.readdirSync(basePath).filter(file => {
        if((file.indexOf('.') !== 0)  && (file.slice(-3) === '.js')) {
            return file;
        }
        var innerDirPath = basePath + file + '/';
        fs.readdirSync(innerDirPath).filter(innerFile => {
            return (innerFile.indexOf('.') !== 0) && (innerFile.slice(-3) === '.js');
        }).forEach(innerFile => {
            require(path.join(innerDirPath, innerFile))(app, router);
        });
    })
    .forEach(file => {
        require(path.join(basePath, file))(app, router);
    });


    fs.readdirSync( modules ).filter(file => {
        if((file.indexOf('.') === 0)  && (file.slice(-3) !== '.js')) {
            var innerDirPath = modules + file + '/routes/';
            fs.readdirSync(innerDirPath).filter(innerFile => {
                return (innerFile.indexOf('.') !== 0) && (innerFile.slice(-3) === '.js');
            }).forEach(innerFile => {
                require(path.join(innerDirPath, innerFile))(app, router);
            });
        }
        
    });


    

}
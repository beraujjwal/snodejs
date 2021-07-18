'use strict';
const fs = require('fs');
const path = require('path');
const basepath = __dirname + '/../../../routes/';
const basename = path.basename(__filename);


module.exports = function(app, router) {
    fs.readdirSync(basepath).filter(file => {
        if((file.indexOf('.') !== 0)  && (file.slice(-3) === '.js')) {
            return file;
        }
        var innerDirPath = basepath + file + '/';
        fs.readdirSync(innerDirPath).filter(innerFile => {
            return (innerFile.indexOf('.') !== 0) && (innerFile.slice(-3) === '.js');
        }).forEach(innerFile => {
            require(path.join(innerDirPath, innerFile))(app, router);
        });
    })
    .forEach(file => {
        require(path.join(basepath, file))(app, router);
    });


    

}
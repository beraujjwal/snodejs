'use strict';
const fs = require('fs');
const chalk = require('chalk');
const log = console.log;
const moduleGenerator = require('./system/core/generator/module-generator');

async function main() {
    try {
        const arrgumentsArr = process.argv.slice(2);
        if(arrgumentsArr.length === 2 && arrgumentsArr[ 0 ].indexOf(':') === 4) {
            let processAction = arrgumentsArr[0].slice(5);
            let actionArr = ['controller', 'model', 'service', 'validation', 'module'];
            if(actionArr.includes(processAction)) {
                await moduleGenerator(arrgumentsArr);
            } else {
                log(chalk.bgRed.bold('Invalid Make Command'));
            }
            
        }else {
            throw new Error('Invalid Command');
        }

    } catch (error) {
        console.log(error.message);
    }
};

main();
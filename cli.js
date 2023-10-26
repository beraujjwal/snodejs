'use strict';
const fs = require('fs');
const chalk = require('chalk');
const log = console.log;
const moduleGenerator = require('./system/core/generator/module-generator');
const dbManipulation = require('./system/core/database');

async function main() {
    try {
        const argumentsArr = process.argv.slice(2);
        if(argumentsArr.length === 2 && argumentsArr[ 0 ].indexOf(':') === 4) {
            let processAction = argumentsArr[0].slice(5);
            let actionArr = ['controller', 'model', 'service', 'validation', 'module'];
            if(actionArr.includes(processAction)) {
                await moduleGenerator(argumentsArr);
            } else {
                log(chalk.bgRed.bold('Invalid Make Command'));
            }

        } else if(argumentsArr.length === 2 && argumentsArr[ 0 ].indexOf(':') === 3) {
            let processAction = argumentsArr[0].slice(4);
            let actionArr = ['migration', 'seeder' ];
            if(actionArr.includes(processAction)) {
                await dbManipulation(argumentsArr);
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
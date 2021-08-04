'use strict';
const fs = require('fs');
const chalk = require('chalk');
const log = console.log;
const moduleGenerator = require('./system/core/generator/module-generator');

async function main() {
    try {
        const arrgumentsArr = process.argv.slice(2);        
        if((arrgumentsArr.length === 2 || arrgumentsArr.length > 2) && (arrgumentsArr.length === 3 || arrgumentsArr.length < 3) && arrgumentsArr[ 0 ].indexOf(':') === 4) {
            let processAction = arrgumentsArr[0].slice(5);
            let services = null;

            if(arrgumentsArr.length === 3 && arrgumentsArr[ 2 ].indexOf('-') === 0) {
                services = arrgumentsArr[ 2 ].split('-')[1].split('');
            } else if (arrgumentsArr.length === 3 && arrgumentsArr[ 2 ].indexOf('-') !== 0){
                throw new Error('Invalid Make Command');
            }
            let subActionArr = [];

            switch (processAction) {
                case 'controller':                    
                    subActionArr = ['m', 's', 'v'];
                    break;
                case 'model':
                    subActionArr = ['c', 's', 'v'];
                    break;
                case 'service':
                    subActionArr = ['c', 'm', 'v'];
                    break;
                case 'validation':
                    subActionArr = ['c', 'm', 's'];
                    break;
                default:
                    break;

            }

            for (const service of services) {
                if(!subActionArr.includes(service)) {
                    throw new Error('Invalid Make Command.');
                }
            }
            
            let actionArr = ['controller', 'model', 'service', 'validation', 'module'];
            if(actionArr.includes(processAction)) {
                await moduleGenerator(arrgumentsArr, services);
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
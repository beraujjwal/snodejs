'use strict';
const chalk = require('chalk');

global.log = function log(message) {
    if (process.env.APP_ENV !== 'production') console.log(chalk.green.bgWhite.bold(`✔ ${message}`));
}
global.info = function info(message) {
    if (process.env.APP_ENV !== 'production') console.log(chalk.green.bgWhite.bold(`✔ ${message}`));
}
global.echo = function echo(message) {
    if (process.env.APP_ENV !== 'production') console.log(chalk.green.bgWhite.bold(`✔ ${message}`));
}
global.error = function error(message) {
    if (process.env.APP_ENV !== 'production') console.log(chalk.red.bgWhite.bold(`✘ ${message}`));
}
global.warn = function warn(message) {
    if (process.env.APP_ENV !== 'production') console.log(chalk.red.bgWhite.bold(`✘ ${message}`));
}
global.currentLoginUserId = 1;
const  { migrator } = require('./migrator');
const  { seeder } = require('./seeder');

module.exports = async function (moduleArg) {
    try {
        const processStep = moduleArg[2];
        const processName = moduleArg[1];
        const processAction = moduleArg[0].slice(4);

        let fileSet = null;

        // if (moduleArg[2] && moduleArg[2].toUpperCase() !== 'ALL') {
        //     const otherAction = moduleArg[2];
        //     console.log(otherAction);
        //     let action = otherAction.split('');
        //     fileSet = new Set(action);
        // } else if (moduleArg[2] && moduleArg[2].toUpperCase() == 'ALL') {
        //     fileSet = new Set(['C', 'M', 'R', 'S', 'V']);
        // }

        switch (processAction) {
            case 'migration':
                await runMigration( processName, processStep );
                break;
            case 'seeder':
                await runSeeder( processName, processStep );
                break;
            default:
                break;
        }
    } catch (error) {
        if (error.code === 'EEXIST') {
            console.error(chalk.redBright('Module already exists.'));
        } else {
            console.error(chalk.redBright(error.message));
        }
    }
};


async function runMigration( processName = 'up', processStep = 'ALL' ) {
    if(processName === 'up')
        await migrator.up().then((data) => {

        }).catch(console.error);
    else
        await migrator.down(0).then((data) => {
            data.forEach(element => {
                console.log(`Now ${element.file} migration is down.`);
            });
        }).catch(console.error);

    return true;
}


async function runSeeder( processName = 'up', processStep = 'ALL' ) {
    if(processName === 'up')
        await seeder.up().then((data) => {
            data.forEach(element => {
                console.log(`Now ${element.file} seeder is up.`);
            });
        }).catch(console.error);
    else
        await seeder.down().then((data) => {
            data.forEach(element => {
                console.log(`Now ${element.file} seeder is down.`);
            });
        }).catch(console.error);

    return true;
}
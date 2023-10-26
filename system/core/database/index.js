'use strict';
const chalk = require('chalk');

const  { migrator } = require('./migrator');
const  { seeder } = require('./seeder');

module.exports = async function (moduleArg) {
    try {
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
                await runMigration( processName );
                break;
            case 'seeder':
                await runSeeder( processName );
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


async function runMigration( processName = 'up' ) {
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


async function runSeeder( processName = 'up' ) {
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
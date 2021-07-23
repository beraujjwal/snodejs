'use strict';
const CURR_DIR = process.cwd();
const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');
const chalk = require('chalk');
const caseChanger = require('case');

module.exports = async function(moduleArg) {
    try {
        const processName = moduleArg[1];
        const processAction = moduleArg[0].slice(5);
        const templatePath = `${__dirname}/sample`;
        let origFilePath = '';
        let contents = '';
        if(processAction != 'module') {
            let destPath = '';
            let file = '';
            let pluralCase = '';
            let singularCase = '';
            let kebabCase = caseChanger.kebab(processAction);
            switch (processAction) {
                case 'controller':                    
                    origFilePath = `${templatePath}/SampleController.js`;
                    kebabCase = caseChanger.pascal(processName);
                    pluralCase = pluralize.plural(kebabCase);
                    file = `${pluralCase}Controller.js`;
                    console.log(chalk.blueBright(`Creating Controller: ${file}`));                    
                    contents = fs.readFileSync(origFilePath, 'utf8');
                    contents = contents.replace(/CONTROLLER_PLURAL_FORM/g, pluralCase);
                    destPath = `${CURR_DIR}/app/controllers`;
                    break;
                case 'model':
                    origFilePath = `${templatePath}/sample.js`;
                    lowerCase = caseChanger.lower(processName, '_');
                    kebabCase = pluralize.singular(lowerCase);
                    file = `${kebabCase}.js`;
                    singularCase = caseChanger.pascal(kebabCase);
                    pluralCase = pluralize.plural(kebabCase);
                    pluralCase = caseChanger.lower(pluralCase, '_');
                    console.log(chalk.blueBright(`Creating Model: ${file}`));
                    contents = fs.readFileSync(origFilePath, 'utf8');
                    contents = contents.replace(/MODEL_SINGULAR_FORM/g, singularCase);
                    contents = contents.replace(/MODEL_PLURAL_FORM/g, pluralCase);
                    destPath = `${CURR_DIR}/models`;
                    break;
                case 'service':
                    origFilePath = `${templatePath}/SampleService.js`;
                    kebabCase = caseChanger.pascal(processName);
                    kebabCase = pluralize.plural(kebabCase);

                    kebabCase = pluralize.plural(kebabCase);

                    file = `${kebabCase}.js`;
                    console.log(chalk.blueBright(`Creating Service: ${file}`));
                    contents = fs.readFileSync(origFilePath, 'utf8');
                    contents = contents.replace(/SERVICE_PLURAL/g, kebabCase);
                    destPath = `${CURR_DIR}/app/services`;
                    break;
                case 'validation':
                    origFilePath = `${templatePath}/sampleValidation.js`;
                    let singularName = pluralize.singular(processName);
                    console.log(`singularName ${singularName}`);
                    kebabCase = caseChanger.lower(singularName, '');
                    file = `${kebabCase}Validation.js`;
                    console.log(chalk.blueBright(`Creating Validation: ${file}`));
                    contents = fs.readFileSync(origFilePath, 'utf8');
                    contents = contents.replace(/VALIDATION_SINGULAR_VALIDATION/g, `${kebabCase}Validation`);
                    destPath = `${CURR_DIR}/app/validations`;
                    break;
                case 'module':                
                    await createDirectoryContents(moduleArg);
                    break;
                default:
                    break;

            }
            fs.mkdirSync(`${destPath}`, {recursive: true}, err => {});
            const writePath = `${destPath}/${file}`;
            if (!fs.existsSync(writePath)) {
                fs.writeFileSync(writePath, contents, 'utf8');
                console.log(chalk.greenBright(writePath));
                console.log(chalk.blueBright('File Generation Completed'));
            } else {
                console.error(chalk.redBright(`${file} already exists.`));
            }
            
        }
        
    } catch (error) {
        if(error.code === 'EEXIST') {
            console.error(chalk.redBright('Module already exists.'));
        } else {
            console.error(chalk.redBright(error.message));
        }
    }
};

// eslint-disable-next-line func-style
async function createDirectoryContents(processName, templatePath = `${__dirname}/sample`) {
    try {
        const filesToCreate = fs.readdirSync(templatePath);
        filesToCreate.forEach((file) => {
            const origFilePath = `${templatePath}/${file}`;

            // get stats about the current file
            const stats = fs.statSync(origFilePath);

            if (stats.isFile()) {
                let contents = fs.readFileSync(origFilePath, 'utf8');
                const PascalCase = caseChanger.pascal(processName);
                const camelCase = caseChanger.camel(processName);
                const kebabCase = caseChanger.kebab(processName);

                console.log(`PascalCase ${PascalCase}`);
                console.log(`camelCase ${camelCase}`);
                console.log(`kebabCase ${kebabCase}`);
                throw new Error('Stop Here');
                switch (file) {
                    case 'SampleController.js':
                        // eslint-disable-next-line no-param-reassign
                        file = `${kebabCase}.controller.js`;
                        contents = contents.replace(/MODULE_SINGULAR_PASCAL/g, PascalCase);
                        contents = contents.replace(/MODULE_SINGULAR_CAMEL/g, camelCase);
                        contents = contents.replace(/MODULE_SINGULAR_KEBAB/g, kebabCase);
                        break;
                    case 'sample.js':
                        // eslint-disable-next-line no-param-reassign
                        file = `${kebabCase}.dto.js`;
                        break;
                    case 'SampleService.js':
                        contents = contents.replace(/MODULE_SINGULAR_PASCAL/g, PascalCase);
                        contents = contents.replace(/MODULE_SINGULAR_CAMEL/g, camelCase);
                        contents = contents.replace(/MODULE_SINGULAR_KEBAB/g, kebabCase);
                        // eslint-disable-next-line no-param-reassign
                        file = `${kebabCase}.model.js`;
                        break;
                    case 'sampleValidation.js':
                        contents = contents.replace(/MODULE_SINGULAR_PASCAL/g, PascalCase);
                        contents = contents.replace(/MODULE_SINGULAR_CAMEL/g, camelCase);
                        contents = contents.replace(/MODULE_SINGULAR_KEBAB/g, kebabCase);
                        // eslint-disable-next-line no-param-reassign
                        file = `${kebabCase}.route.js`;
                        break;
                    default:
                        break;
                }
                const writePath = `${moduleWritePath}/${file}`;
                fs.writeFileSync(writePath, contents, 'utf8');
                console.log(chalk.greenBright(writePath));
            }

        });
    } catch (error) {}
}
"use strict";
const chalk = require("chalk");
const log = console.log;
const moduleGenerator = require("./system/generator");
const dbManipulation = require("./system/core/database");
const librarySetup = require("./system/setup");

async function main() {
  try {
    const argumentsArr = process.argv.slice(2);
    if (argumentsArr.length === 2 && argumentsArr[0].indexOf(":") === 4) {
      let processAction = argumentsArr[0].slice(5);
      let actionArr = [
        "controller",
        "model",
        "service",
        "validation",
        "module",
      ];
      if (actionArr.includes(processAction)) {
        await moduleGenerator(argumentsArr);
      } else {
        log(chalk.bgRed.bold("Invalid Make Command"));
      }
    } else if (
      argumentsArr.length === 2 &&
      argumentsArr[0].indexOf(":") === 3
    ) {
      let processAction = argumentsArr[0].slice(4);
      let actionArr = ["migration", "seeder"];
      if (actionArr.includes(processAction)) {
        await dbManipulation(argumentsArr);
      } else {
        log(chalk.bgRed.bold("Invalid Make Command"));
      }
    } else if (
      argumentsArr.length === 2 &&
      argumentsArr[0].indexOf(":") === 5
    ) {
      let processAction = argumentsArr[0].slice(4);
      let actionArr = [
        "elasticsearch",
        "kafka",
        "neo4j",
        "quickbooks",
        "redis",
        "sms",
        "speakeasy",
        "winston",
      ];
      if (actionArr.includes(processAction)) {
        await librarySetup(argumentsArr);
      } else {
        log(chalk.bgRed.bold("Invalid Make Command"));
      }
    } else {
      throw new Error("Invalid Command");
    }
  } catch (error) {
    log(error.message);
  }
}

main();

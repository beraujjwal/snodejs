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
      case "elasticsearch":
        await runMigration(processName, processStep);
        break;
      case "kafka":
        await runSeeder(processName, processStep);
        break;
      case "neo4j":
        await runSeeder(processName, processStep);
        break;
      case "quickbooks":
        await runSeeder(processName, processStep);
        break;
      case "redis":
        await runSeeder(processName, processStep);
        break;
      case "sms":
        await runSeeder(processName, processStep);
        break;
      case "speakeasy":
        await runSeeder(processName, processStep);
        break;
      case "winston":
        await runSeeder(processName, processStep);
        break;
      default:
        break;
    }
  } catch (error) {
    if (error.code === "EEXIST") {
      console.error(chalk.redBright("Module already exists."));
    } else {
      console.error(chalk.redBright(error.message));
    }
  }
};

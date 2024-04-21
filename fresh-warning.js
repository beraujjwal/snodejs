// fresh-warning.js
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "\n*** WARNING ***\nFresh migration means, it will delete all you all tables with data & run migration & seeding again. \nAre you sure you want to continue? (yes/no) ",
  (answer) => {
    if (
      answer.toLowerCase() === "yes" ||
      answer.toLowerCase() === "YES" ||
      answer.toLowerCase() === "Y" ||
      answer.toLowerCase() === "y"
    ) {
      rl.close(); // If yes, continue
    } else {
      console.log("Migration aborted.");
      rl.close();
      process.exit(1); // If no, exit with non-zero status to stop build
    }
  }
);

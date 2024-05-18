// fresh-warning.js
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "\n*** WARNING ***\nUndo migrate all means, it will delete your all tables with data. \nAre you sure you want to continue? (yes/no) ",
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

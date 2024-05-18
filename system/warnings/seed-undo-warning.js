// fresh-warning.js
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "\n*** WARNING ***\nUndo seed means, it will delete your all data from all tables. \nAre you sure you want to continue? (yes/no) ",
  (answer) => {
    if (
      answer.toLowerCase() === "yes" ||
      answer.toLowerCase() === "YES" ||
      answer.toLowerCase() === "Y" ||
      answer.toLowerCase() === "y"
    ) {
      rl.close(); // If yes, continue
    } else {
      console.log("Seeding aborted.");
      rl.close();
      process.exit(1); // If no, exit with non-zero status to stop build
    }
  }
);

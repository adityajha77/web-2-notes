// import chalk from 'chalk';
// //const chalkk=require("chalk");

// console.log(chalk.blue("hello world"));
// console.log(chalk.bold("namastey world "));
// console.log(chalk.underline.red.bold("holaa duniya"));
//express is also the one of the library .
//lock file in the package json it will lock the version lock the exact version. when installing the file.

//commander.js is the dependencies for cli makking
//creatinig a cli.
//const { program } = require('commander'); require is for the commonjs use import for es6 module
import { program } from 'commander';

program
  .option('--first')
  .option('-s, --separator <char>')
  .argument('<string>')
  .parse();
  
// program.commands('count')
// .action((file)=>{
//     fs.readFile(file.utf-8,)....
// })

const input = program.args[0];

console.log(input.length);
//process.arg is the way to get the argument of the paths given in the cli.
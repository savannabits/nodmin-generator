#! /usr/bin/env ./node_modules/node/bin/node
console.log("console.log output");
import shell from 'shelljs';
shell.exec("echo shell.exec works");
import { generateModel } from '../generators/model-generator';

const args = process.argv.slice(2); // Commandline arguments
const tableName = args[0];
if (!tableName) {
    console.error("Sorry, the table name must be defined. Please use the command $ admin-generate table_name");
    shell.exit(1);
}

// Generate Model
generateModel(tableName);
#! /usr/bin/env ./node_modules/node/bin/node
console.log("console.log output");
import shell from 'shelljs';
shell.exec("echo shell.exec works");
import { generateModel } from '../generators/model-generator';
import { generateRoutes } from '../generators/routes';
import {generateController} from '../generators/controller'

const args = process.argv.slice(2); // Commandline arguments
const tableName = args[0];
if (!tableName) {
    console.error("Sorry, the table name must be defined. Please use the command $ admin-generate table_name");
    shell.exit(1);
}
if (tableName === 'entity') {
    const table = args[1];
    if (!table) {
        throw new Error("No table defined. Please use '$ admin-generate entity table_name'");
    }
    generateModel(table);
} else {
    generateController(tableName);
    generateRoutes(tableName);
}

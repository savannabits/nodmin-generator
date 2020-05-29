import _ from 'lodash';
import fs from "fs";
import path from "path"
import {sed} from 'shelljs'
import pluralize from "pluralize"
import { generateEntityName } from '../../helpers/name-generator';
export function generateModel(tableName: string) {
    console.log("Creating model");
    const entityName = generateEntityName(tableName);
    console.log(`Generating Entity: ${entityName}`);
    
    const dest = "./src/entity/"+entityName+".ts";
    const stub = './node_modules/admin-generator/stubs/Entity.stub'
    fs.copyFile(stub, dest, (err) => {
        if (err) throw err;
        sed('-i', '<%tableName%>', tableName, dest);
        sed('-i', '<%entityName%>', entityName, dest);
        console.log(`Entity ${dest} generated`);
    });
}
#! /usr/bin/env ./node_modules/node/bin/node
console.log("console.log output");
import shell from 'shelljs';
shell.exec("echo shell.exec works");
import fs from "fs"
async function print(path: any) {
  const dir = await fs.promises.opendir(path);
  for await (const dirent of dir) {
    console.log(dirent.name);
  }
}
print('./').catch(console.error);
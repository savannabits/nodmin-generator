import fs from 'fs'
import _ from "lodash"
import pluralize from 'pluralize'
export function generateRoutes(tableName: string) {
    const controller = _.upperFirst(_.camelCase(`${pluralize.singular(tableName)}Controller`));
    const marker = '/**###APPEND_ROUTES###*/';
    const routes = 
`{
    method: "get",
    route: "/${pluralize.plural(tableName)}",
    middleware: [],
    controller: ${controller},
    action: "all"
}, {
    method: "get",
    route: "/${pluralize.plural(tableName)}/:id",
    middleware: [],
    controller: ${controller},
    action: "one"
}, {
    method: "post",
    route: "/${pluralize.plural(tableName)}",
    middleware: [],
    controller: ${controller},
    action: "create"
}, {
    method: "put",
    route: "/${pluralize.plural(tableName)}/:id",
    middleware: [],
    controller: ${controller},
    action: "update"
}, {
    method: "delete",
    route: "/${pluralize.plural(tableName)}/:id",
    middleware: [],
    controller: ${controller},
    action: "remove"
}, 
/**###APPEND_ROUTES###*/`;
    const importSearch = "/**<%IMPORTS%>**/"
    const imports =
`import {${controller}} from "./controller/${controller}"
/**<%IMPORTS%>**/`

    //Replace
    fs.readFile("./src/routes.ts", 'utf-8', function(err, data) {
    if (err) throw err; 
    let content = data.replace(marker,routes);
    content = content.replace(importSearch, imports);
 
    fs.writeFile('./src/routes.ts', content, () => {
        console.log("Success");
    });
})
}
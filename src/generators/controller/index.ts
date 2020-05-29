import fs from 'fs'
import { generateControllerName, generateEntityName, generateSingularTableName } from '../../helpers/name-generator';
export function generateController(tableName: string) {
    const entity = generateEntityName(tableName);
    const controller = generateControllerName(tableName);
    const singularTable = generateSingularTableName(tableName);
    let replacements = <object>{
        "<%ControllerName%>": controller,
        "<%tableName%>": tableName,
        "<%tableSingular%>": singularTable,
        "<%EntityName%>": entity,
    };

    //Copy -> THe paths are highly opinionated.
    const dest = "./src/controller/"+controller+".ts";
    const stub = './node_modules/admin-generator/stubs/Controller.stub'
    fs.copyFile(stub, dest, (err) => {
        if (err) throw err;
        console.log(`Controller ${dest} generated. Performing final touches...`);

        //Replace
        fs.readFile(dest, 'utf-8', function(err, data) {
        if (err) throw err; 
        let content = data;
        for (let [key, replacement] of Object.entries(replacements)) {
            console.log(`replacing ${key} with ${replacement}`)
            const reg = new RegExp(key,'g')
            content = content.replace(reg,replacement);
        }
        fs.writeFile(dest, content, () => {
            console.log("Done. Your controller is ready.");
        });
    });
})
}
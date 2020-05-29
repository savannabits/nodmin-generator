import _ from "lodash";
import pluralize, { singular } from 'pluralize'
export function generateControllerName(tableName: string): any {
    return _.upperFirst(_.camelCase(`${pluralize.singular(tableName)}Controller`));
}

export function generateSingularTableName(tableName: string): string {
    return _.lowerCase(singular(tableName));
}

export function generateEntityName(tableName: string): any {
    const entityName = _.upperFirst(_.camelCase(pluralize.singular(tableName)));
    return entityName;
} 
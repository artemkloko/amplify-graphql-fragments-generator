"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFragment = void 0;
const change_case_1 = require("change-case");
const getFields_1 = require("./getFields");
const getFragments_1 = require("./getFragments");
const getFragment = (context, typeObj, external, depth, name, filterFields = []) => {
    /**
     * The following is loosely copied from
     * amplify-cli/packages/amplify-graphql-docs-generator/src/generator/getFragment.ts
     */
    const nextDepth = (depth || context.options.maxDepth) - 1;
    const subFields = (typeObj && typeObj.getFields && typeObj.getFields()) || [];
    const filterFieldNames = filterFields.map((f) => f.name);
    const fields = Object.keys(subFields)
        .map((field) => getFields_1.getFields(context, subFields[field], nextDepth))
        .filter((field) => !!field && !filterFieldNames.includes(field.name));
    if (!fields.length) {
        return undefined;
    }
    name = name || typeObj.name;
    const refs = getFragments_1.collectRefsFromFields(fields);
    const templateFragment = {
        on: typeObj.name,
        fields,
        external,
        name,
        variableName: change_case_1.camelCase(`${name}Fragment`),
        refs,
    };
    return templateFragment;
};
exports.getFragment = getFragment;
//# sourceMappingURL=getFragment.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOperations = void 0;
const constants_1 = require("../constants");
const generateOperation_1 = require("./generateOperation");
const generateOperations = (context, types) => {
    const operations = [];
    for (const type of types) {
        /**
         * The following is loosely copied from
         * amplify-cli/packages/amplify-graphql-docs-generator/src/generator/generateAllOperations.ts
         */
        const getter = constants_1.GRAPHQL_SCHEMA_GETTER[type];
        const operationsType = context.schema[getter]();
        if (operationsType) {
            const operationsMap = operationsType.getFields();
            for (const operationName of Object.keys(operationsMap)) {
                const operationTemplate = generateOperation_1.generateOperation(context, type, operationsMap[operationName]);
                if (operationTemplate) {
                    operations.push(operationTemplate);
                }
            }
        }
    }
    return operations;
};
exports.generateOperations = generateOperations;
//# sourceMappingURL=generateOperations.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAllOps = void 0;
const generateOperations_1 = require("./generateOperations");
const generator_1 = require("amplify-graphql-docs-generator/lib/generator");
const getFragments_1 = require("./getFragments");
const constants_1 = require("../constants");
function generateAllOps(schemaDoc, maxDepth, options) {
    const operationsTypesMap = Object.values(generator_1.GQLOperationTypeEnum).reduce((acc, type) => {
        const getter = constants_1.GraphQLSchemaGetters[type];
        const operationsTypes = schemaDoc[getter]();
        if (operationsTypes) {
            acc[type] = generateOperations_1.generateOperations(operationsTypes, schemaDoc, maxDepth, options, type);
        }
        return acc;
    }, {});
    const fragments = getFragments_1.getFragments(options.fragments, schemaDoc);
    const refs = getFragments_1.collectSubRefs(Object.values(operationsTypesMap).filter((operationsTypes) => !!operationsTypes));
    return { operationsTypesMap, fragments, refs };
}
exports.generateAllOps = generateAllOps;
//# sourceMappingURL=generateAllOps.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAllOps = void 0;
const generateAllOperations_1 = require("./generateAllOperations");
const generator_1 = require("amplify-graphql-docs-generator/lib/generator");
const getFragments_1 = require("./getFragments");
function generateAllOps(schemaDoc, maxDepth, options) {
    const getters = {
        [generator_1.GQLOperationTypeEnum.QUERY]: "getQueryType",
        [generator_1.GQLOperationTypeEnum.MUTATION]: "getMutationType",
        [generator_1.GQLOperationTypeEnum.SUBSCRIPTION]: "getSubscriptionType",
    };
    const operationsTypesMap = Object.keys(getters).reduce((acc, type) => {
        const getter = getters[type];
        const operationsTypes = schemaDoc[getter]();
        if (operationsTypes) {
            acc[type] = generateAllOperations_1.generateOperations(operationsTypes, schemaDoc, maxDepth, options, type);
        }
        return acc;
    }, {
        [generator_1.GQLOperationTypeEnum.QUERY]: [],
        [generator_1.GQLOperationTypeEnum.MUTATION]: [],
        [generator_1.GQLOperationTypeEnum.SUBSCRIPTION]: [],
    });
    const fragments = getFragments_1.getFragments(options.fragments, schemaDoc);
    return { operationsTypesMap, fragments };
}
exports.generateAllOps = generateAllOps;
//# sourceMappingURL=generate.js.map
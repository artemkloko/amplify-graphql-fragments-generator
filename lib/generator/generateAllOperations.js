"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectExternalFragments = exports.generateSubscriptions = exports.generateMutations = exports.generateQueries = void 0;
const change_case_1 = require("change-case");
const generateOperation_1 = __importDefault(require("./generateOperation"));
const types_1 = require("./types");
function generateQueries(queries, schema, maxDepth, options) {
    if (queries) {
        const allQueries = queries.getFields();
        const processedQueries = Object.keys(allQueries).map(queryName => {
            const type = types_1.GQLOperationTypeEnum.QUERY;
            const op = generateOperation_1.default(allQueries[queryName], schema, maxDepth, options);
            const name = change_case_1.pascalCase(queryName);
            return { type, name, ...op };
        });
        return processedQueries;
    }
}
exports.generateQueries = generateQueries;
function generateMutations(mutations, schema, maxDepth, options) {
    if (mutations) {
        const allMutations = mutations.getFields();
        const processedMutations = Object.keys(allMutations).map(mutationName => {
            const type = types_1.GQLOperationTypeEnum.MUTATION;
            const op = generateOperation_1.default(allMutations[mutationName], schema, maxDepth, options);
            const name = change_case_1.pascalCase(mutationName);
            return { type, name, ...op };
        });
        return processedMutations;
    }
}
exports.generateMutations = generateMutations;
function generateSubscriptions(subscriptions, schema, maxDepth, options) {
    if (subscriptions) {
        const allSubscriptions = subscriptions.getFields();
        const processedMutations = Object.keys(allSubscriptions).map(subscriptionName => {
            const type = types_1.GQLOperationTypeEnum.SUBSCRIPTION;
            const op = generateOperation_1.default(allSubscriptions[subscriptionName], schema, maxDepth, options);
            const name = change_case_1.pascalCase(subscriptionName);
            return { type, name, ...op };
        });
        return processedMutations;
    }
}
exports.generateSubscriptions = generateSubscriptions;
function collectExternalFragments(operations = []) {
    const fragments = {};
    operations.forEach(op => {
        getExternalFragment(op.body, fragments);
    });
    return Object.values(fragments);
}
exports.collectExternalFragments = collectExternalFragments;
function getExternalFragment(field, externalFragments = {}) {
    field.fragments
        .filter(fragment => fragment.external)
        .reduce((acc, val) => {
        acc[val.name] = val;
        return acc;
    }, externalFragments);
    field.fields.forEach(f => {
        getExternalFragment(f, externalFragments);
    });
    return externalFragments;
}
//# sourceMappingURL=generateAllOperations.js.map
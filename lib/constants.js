"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GRAPHQL_SCHEMA_GETTER = exports.OPERATIONS_FILENAME = exports.FILE_EXTENSION_MAP = void 0;
const generator_1 = require("amplify-graphql-docs-generator/lib/generator");
const types_1 = require("./types");
exports.FILE_EXTENSION_MAP = {
    [types_1.Language.JAVASCRIPT]: "js",
    [types_1.Language.TYPESCRIPT]: "ts",
};
exports.OPERATIONS_FILENAME = {
    [generator_1.GQLOperationTypeEnum.QUERY]: "queries",
    [generator_1.GQLOperationTypeEnum.MUTATION]: "mutations",
    [generator_1.GQLOperationTypeEnum.SUBSCRIPTION]: "subscriptions",
};
exports.GRAPHQL_SCHEMA_GETTER = {
    [generator_1.GQLOperationTypeEnum.QUERY]: "getQueryType",
    [generator_1.GQLOperationTypeEnum.MUTATION]: "getMutationType",
    [generator_1.GQLOperationTypeEnum.SUBSCRIPTION]: "getSubscriptionType",
};
//# sourceMappingURL=constants.js.map
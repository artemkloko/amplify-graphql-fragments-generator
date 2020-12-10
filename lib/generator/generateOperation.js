"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOperation = void 0;
const change_case_1 = require("change-case");
const getArgs_1 = __importDefault(require("amplify-graphql-docs-generator/lib/generator/getArgs"));
const getBody_1 = require("./getBody");
const getFragments_1 = require("./getFragments");
const generateOperation = (context, type, operation) => {
    /**
     * The following is loosely copied from
     * amplify-cli/packages/amplify-graphql-docs-generator/src/generator/generateOperation.ts
     */
    const name = change_case_1.pascalCase(operation.name);
    const args = getArgs_1.default(operation.args);
    const body = getBody_1.getBody(context, operation);
    if (!body) {
        return undefined;
    }
    const refs = getFragments_1.collectRefsFromFields([body]);
    const templateOp = { name, type, args, body, refs };
    return templateOp;
};
exports.generateOperation = generateOperation;
//# sourceMappingURL=generateOperation.js.map
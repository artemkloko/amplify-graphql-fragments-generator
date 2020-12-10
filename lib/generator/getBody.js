"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBody = void 0;
const getFields_1 = require("./getFields");
const getBody = (context, op) => {
    /**
     * The following is loosely copied from
     * amplify-cli/packages/amplify-graphql-docs-generator/src/generator/getBody.ts
     */
    const args = op.args.map((arg) => ({
        name: arg.name,
        value: `\$${arg.name}`,
    }));
    const fields = getFields_1.getFields(context, op, context.options.maxDepth);
    if (!fields) {
        return undefined;
    }
    const templateOpBody = { args, ...fields };
    return templateOpBody;
};
exports.getBody = getBody;
//# sourceMappingURL=getBody.js.map
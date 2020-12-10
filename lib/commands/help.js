"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const amplify_plugin_json_1 = __importDefault(require("../../amplify-plugin.json"));
const run = async (context) => {
    /**
     * Copied from
     * amplify-cli/packages/amplify-category-api/src/commands/api.js
     */
    const header = `amplify ${amplify_plugin_json_1.default.name} <subcommands>`;
    const commands = [
        {
            name: "generate",
            description: "Generates GraphQL fragments and statements(query, mutations and subscriptions) for the provided introspection schema",
        },
        {
            name: "help",
            description: `Prints this message`,
        },
        {
            name: "version",
            description: `Prints version info`,
        },
    ];
    context.amplify.showHelp(header, commands);
    context.print.info("");
};
exports.run = run;
//# sourceMappingURL=help.js.map
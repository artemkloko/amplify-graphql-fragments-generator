"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const generate_1 = require("../commands/generate");
const run = async (context, args) => {
    /**
     * This is loosely copied from
     * amplify-cli/packages/amplify-codegen/src/callbacks/prePushUpdateCallback.js
     */
    const shouldGenerate = await askUpdate();
    if (shouldGenerate) {
        generate_1.run(context);
    }
};
exports.run = run;
const askUpdate = async () => {
    /**
     * This is loosely copied from
     * amplify-cli/packages/amplify-codegen/src/walkthrough/questions/updateCode.js
     */
    const answer = await inquirer_1.default.prompt([
        {
            name: "confirmUpdate",
            message: "Do you want to update code for your updated GraphQL API",
            type: "confirm",
            default: true,
        },
    ]);
    return answer.confirmUpdateCode;
};
//# sourceMappingURL=handle-PostPush.js.map
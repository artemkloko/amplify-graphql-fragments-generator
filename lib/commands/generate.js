"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const path = __importStar(require("path"));
const codegen_config_1 = __importDefault(require("amplify-codegen/src/codegen-config"));
const generator_1 = require("../generator");
const run = async (context) => {
    /**
     * Most of the following is loosely copied from
     * amplify-cli/packages/amplify-codegen/src/commands/statements.js
     */
    const config = codegen_config_1.default(context, false);
    const { projectPath } = context.amplify.getEnvInfo();
    for (const cfg of config.getProjects()) {
        const includeFiles = path.join(projectPath, cfg.includes[0]);
        const opsGenDirectory = cfg.amplifyExtension.docsFilePath
            ? path.join(projectPath, cfg.amplifyExtension.docsFilePath)
            : path.dirname(path.dirname(includeFiles));
        const schemaPath = path.join(projectPath, cfg.schema);
        generator_1.generate(schemaPath, opsGenDirectory, {
            maxDepth: cfg.amplifyExtension.maxDepth,
            language: cfg.amplifyExtension.codeGenTarget,
            fragments: cfg.amplifyExtension.fragments,
            separateFiles: true,
        });
        context.print.info(`Generated fragments and statements successfully and saved at ${opsGenDirectory}`);
    }
};
exports.run = run;
//# sourceMappingURL=generate.js.map
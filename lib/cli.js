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
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const yargs = __importStar(require("yargs"));
const path = __importStar(require("path"));
const logger_1 = require("amplify-graphql-docs-generator/lib/logger");
const generator_1 = require("./generator");
const types_1 = require("./types");
/**
 * Most of the following is loosely copied from
 * amplify-cli/packages/amplify-graphql-docs-generator/src/cli.ts
 */
// / Make sure unhandled errors in async code are propagated correctly
process.on("unhandledRejection", (error) => {
    throw error;
});
process.on("uncaughtException", handleError);
function handleError(error) {
    logger_1.logError(error);
    process.exit(1);
}
function run(argv) {
    // tslint:disable
    yargs
        .command("$0", "Generate GraphQL fragments and statements(query, mutations and subscriptions) for the provided introspection schema", {
        schema: {
            demand: true,
            describe: "Path to introspection schema",
            default: "schema.json",
            normalize: true,
            coerce: path.resolve,
        },
        output: {
            demand: true,
            default: "statements",
            normalize: true,
            coerce: path.resolve,
        },
        language: {
            demand: true,
            default: types_1.Language.TYPESCRIPT,
            normalize: true,
            choices: Object.values(types_1.Language),
        },
        fragments: {
            demand: true,
            describe: "Fragments to generate",
            normalize: true,
            array: true,
            type: "string",
        },
        maxDepth: {
            demand: true,
            default: 2,
            normalize: true,
            type: "number",
        },
        separateFiles: {
            default: false,
            type: "boolean",
        },
    }, async (argv) => {
        generator_1.generate(argv.schema, argv.output, {
            maxDepth: argv.maxDepth,
            separateFiles: argv.separateFiles,
            language: argv.language,
            fragments: argv.fragments,
        });
    })
        .help()
        .version()
        .strict().argv;
}
exports.run = run;
//# sourceMappingURL=cli.js.map
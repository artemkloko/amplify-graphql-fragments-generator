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
exports.generate = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs-extra"));
const loading_1 = require("amplify-graphql-docs-generator/lib/generator/utils/loading");
const generator_1 = require("amplify-graphql-docs-generator/lib/generator");
const types_1 = require("../types");
const constants_1 = require("../constants");
const getFragments_1 = require("./getFragments");
const generateOperations_1 = require("./generateOperations");
const render_1 = require("./render");
const isSupportedLanguage = (language) => Object.values(types_1.Language).includes(language);
const generate = async (schemaPath, outputPath, options) => {
    const { language } = options;
    if (!isSupportedLanguage(language)) {
        throw new Error(`${language} is not supported, please use one of ${Object.values(types_1.Language)}.`);
    }
    const context = {
        schema: loading_1.loadSchema(schemaPath),
        options: {
            ...options,
            language,
            useExternalFragmentForS3Object: options.language === "graphql",
        },
    };
    const fileExtension = constants_1.FILE_EXTENSION_MAP[language];
    const types = Object.values(generator_1.GQLOperationTypeEnum);
    /**
     * The following is loosely copied from
     * amplify-cli/packages/amplify-graphql-docs-generator/src/index.ts
     */
    render_1.registerPartials();
    render_1.registerHelpers(language);
    if (context.options.separateFiles) {
        /**
         * If we need separate files
         *  - collect operations and imports for each GQLOperationTypeEnum
         *  - write collected objects to separate files
         *  - collect fragments and write them to a separate file
         */
        types.forEach((type) => {
            const operations = generateOperations_1.generateOperations(context, [type]);
            if (operations.length) {
                const refs = getFragments_1.collectSubRefs(operations);
                const imports = { ["." + path.sep + "fragments"]: refs };
                const gql = render_1.render(context, { operations, fragments: [], imports });
                const filename = constants_1.OPERATIONS_FILENAME[type];
                const filepath = path.resolve(path.join(outputPath, `${filename}.${fileExtension}`));
                fs.writeFileSync(filepath, gql);
            }
        });
        const fragments = getFragments_1.getFragments(context);
        if (fragments.length) {
            const gql = render_1.render(context, { operations: [], fragments, imports: {} });
            const filepath = path.resolve(path.join(outputPath, `fragments.${fileExtension}`));
            fs.writeFileSync(filepath, gql);
        }
    }
    else {
        /**
         * If we don't need separate files
         *  - collect operations and fragments
         *  - write collected object to a single files
         */
        const operations = generateOperations_1.generateOperations(context, types);
        const fragments = getFragments_1.getFragments(context);
        if (operations.length || fragments.length) {
            const gql = render_1.render(context, { operations, fragments, imports: {} });
            const filepath = path.resolve(outputPath);
            fs.writeFileSync(filepath, gql);
        }
    }
};
exports.generate = generate;
//# sourceMappingURL=index.js.map
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
exports.format = exports.registerHelpers = exports.registerPartials = exports.render = void 0;
const path = __importStar(require("path"));
const fs = __importStar(require("fs-extra"));
const change_case_1 = require("change-case");
const handlebars = __importStar(require("handlebars"));
const prettier = __importStar(require("prettier"));
const types_1 = require("../types");
const TEMPLATE_DIR = path.resolve(path.join(__dirname, "../../templates"));
const render = (context, doc) => {
    /**
     * The following is loosely copied from
     * amplify-cli/packages/amplify-graphql-docs-generator/src/index.ts
     */
    const templateFiles = {
        [types_1.Language.JAVASCRIPT]: "javascript.hbs",
        [types_1.Language.TYPESCRIPT]: "typescript.hbs",
    };
    const templatePath = path.join(TEMPLATE_DIR, templateFiles[context.options.language]);
    const templateStr = fs.readFileSync(templatePath, "utf8");
    const template = handlebars.compile(templateStr, {
        noEscape: true,
        preventIndent: true,
    });
    const gql = template(doc);
    return exports.format(gql, context.options.language);
};
exports.render = render;
const registerPartials = () => {
    /**
     * The following is loosely copied from
     * amplify-cli/packages/amplify-graphql-docs-generator/src/index.ts
     */
    const partials = fs.readdirSync(TEMPLATE_DIR);
    partials.forEach((partial) => {
        if (!partial.startsWith("_") || !partial.endsWith(".hbs")) {
            return;
        }
        const partialPath = path.join(TEMPLATE_DIR, partial);
        const partialName = path.basename(partial).split(".")[0];
        const partialContent = fs.readFileSync(partialPath, "utf8");
        handlebars.registerPartial(partialName.substring(1), partialContent);
    });
};
exports.registerPartials = registerPartials;
const registerHelpers = (language) => {
    /**
     * The following is loosely copied from
     * amplify-cli/packages/amplify-graphql-docs-generator/src/index.ts
     */
    handlebars.registerHelper("camelCase", change_case_1.camelCase);
    handlebars.registerHelper("format", function (fnOptions) {
        const result = fnOptions.fn();
        return exports.format(result, language);
    });
};
exports.registerHelpers = registerHelpers;
const format = (str, language) => {
    /**
     * The following is loosely copied from
     * amplify-cli/packages/amplify-graphql-docs-generator/src/index.ts
     */
    const parserMap = {
        [types_1.Language.JAVASCRIPT]: "babel",
        [types_1.Language.TYPESCRIPT]: "typescript",
    };
    return prettier.format(str, { parser: parserMap[language] });
};
exports.format = format;
//# sourceMappingURL=render.js.map
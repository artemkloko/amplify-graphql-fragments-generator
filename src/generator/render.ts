import * as path from "path";
import * as fs from "fs-extra";
import { camelCase } from "change-case";
import * as handlebars from "handlebars";
import * as prettier from "prettier";

import { GQLTemplateFragment } from "amplify-graphql-docs-generator/lib/generator";

import { Context, Language, TemplateGenericOp } from "../types";

const TEMPLATE_DIR = path.resolve(path.join(__dirname, "../../templates"));

export const render = (
  context: Context,
  doc: {
    operations: TemplateGenericOp[];
    fragments?: GQLTemplateFragment[];
    imports: Record<string, string[]>;
  }
) => {
  /**
   * The following is loosely copied from
   * amplify-cli/packages/amplify-graphql-docs-generator/src/index.ts
   */
  const templateFiles: Record<Language, string> = {
    [Language.JAVASCRIPT]: "javascript.hbs",
    [Language.TYPESCRIPT]: "typescript.hbs",
  };

  const templatePath = path.join(
    TEMPLATE_DIR,
    templateFiles[context.options.language]
  );
  const templateStr = fs.readFileSync(templatePath, "utf8");

  const template = handlebars.compile(templateStr, {
    noEscape: true,
    preventIndent: true,
  });
  const gql = template(doc);
  return format(gql, context.options.language);
};

export const registerPartials = () => {
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

export const registerHelpers = (language: Language) => {
  /**
   * The following is loosely copied from
   * amplify-cli/packages/amplify-graphql-docs-generator/src/index.ts
   */
  handlebars.registerHelper("camelCase", camelCase);
  handlebars.registerHelper("format", function (fnOptions) {
    const result = fnOptions.fn();
    return format(result, language);
  });
};

export const format = (str: string, language: Language) => {
  /**
   * The following is loosely copied from
   * amplify-cli/packages/amplify-graphql-docs-generator/src/index.ts
   */
  const parserMap: Record<Language, prettier.Options["parser"]> = {
    [Language.JAVASCRIPT]: "babel",
    [Language.TYPESCRIPT]: "typescript",
  };
  return prettier.format(str, { parser: parserMap[language] });
};

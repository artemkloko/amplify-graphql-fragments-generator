import * as path from "path";
import * as fs from "fs-extra";

import { loadSchema } from "amplify-graphql-docs-generator/lib/generator/utils/loading";
import { GQLOperationTypeEnum } from "amplify-graphql-docs-generator/lib/generator";

import { Context, Language } from "../types";
import { FILE_EXTENSION_MAP, OPERATIONS_FILENAME } from "../constants";
import { collectSubRefs, getFragments } from "./getFragments";
import { generateOperations } from "./generateOperations";
import { registerHelpers, registerPartials, render } from "./render";

const isSupportedLanguage = (language: string): language is Language =>
  (Object.values(Language) as string[]).includes(language);

export const generate = async (
  schemaPath: string,
  outputPath: string,
  options: {
    maxDepth: number;
    separateFiles: boolean;
    language: string;
    fragments: string[];
  }
) => {
  const { language } = options;

  if (!isSupportedLanguage(language)) {
    throw new Error(
      `${language} is not supported, please use one of ${Object.values(
        Language
      )}.`
    );
  }

  const context: Context = {
    schema: loadSchema(schemaPath),
    options: {
      ...options,
      language,
      useExternalFragmentForS3Object: options.language === "graphql",
    },
  };

  const fileExtension = FILE_EXTENSION_MAP[language];
  const types = Object.values(GQLOperationTypeEnum);

  /**
   * The following is loosely copied from
   * amplify-cli/packages/amplify-graphql-docs-generator/src/index.ts
   */
  registerPartials();
  registerHelpers(language);

  if (context.options.separateFiles) {
    /**
     * If we need separate files
     *  - collect operations and imports for each GQLOperationTypeEnum
     *  - write collected objects to separate files
     *  - collect fragments and write them to a separate file
     */
    types.forEach((type) => {
      const operations = generateOperations(context, [type]);
      if (operations.length) {
        const refs = collectSubRefs(operations);
        const imports = { ["." + path.sep + "fragments"]: refs };
        const gql = render(context, { operations, fragments: [], imports });
        const filename = OPERATIONS_FILENAME[type];
        const filepath = path.resolve(
          path.join(outputPath, `${filename}.${fileExtension}`)
        );
        fs.writeFileSync(filepath, gql);
      }
    });

    const fragments = getFragments(context);
    if (fragments.length) {
      const gql = render(context, { operations: [], fragments, imports: {} });
      const filepath = path.resolve(
        path.join(outputPath, `fragments.${fileExtension}`)
      );
      fs.writeFileSync(filepath, gql);
    }
  } else {
    /**
     * If we don't need separate files
     *  - collect operations and fragments
     *  - write collected object to a single files
     */
    const operations = generateOperations(context, types);
    const fragments = getFragments(context);
    if (operations.length || fragments.length) {
      const gql = render(context, { operations, fragments, imports: {} });
      const filepath = path.resolve(outputPath);
      fs.writeFileSync(filepath, gql);
    }
  }
};

import * as yargs from "yargs";
import * as path from "path";

import { logError } from "amplify-graphql-docs-generator/lib/logger";

import { generate } from "./generator";
import { Language } from "./types";

/**
 * Most of the following is loosely copied from
 * amplify-cli/packages/amplify-graphql-docs-generator/src/cli.ts
 */

// / Make sure unhandled errors in async code are propagated correctly
process.on("unhandledRejection", (error) => {
  throw error;
});

process.on("uncaughtException", handleError);

function handleError(error: Error) {
  logError(error);
  process.exit(1);
}

export function run(argv: Array<String>): void {
  // tslint:disable
  yargs
    .command(
      "$0",
      "Generate GraphQL fragments and statements(query, mutations and subscriptions) for the provided introspection schema",
      {
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
          default: Language.TYPESCRIPT,
          normalize: true,
          choices: Object.values(Language),
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
      },
      async (argv) => {
        generate(argv.schema, argv.output, {
          maxDepth: argv.maxDepth,
          separateFiles: argv.separateFiles,
          language: argv.language,
          fragments: argv.fragments,
        });
      }
    )
    .help()
    .version()
    .strict().argv;
}

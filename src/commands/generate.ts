import * as path from "path";
import { Context } from "@aws-amplify/cli/lib/domain/context";
import loadConfig from "amplify-codegen/src/codegen-config";

import { generate } from "../generator";

export const run = async (context: Context) => {
  /**
   * Most of the following is loosely copied from
   * amplify-cli/packages/amplify-codegen/src/commands/statements.js
   */
  const config = loadConfig(context, false);
  const { projectPath } = context.amplify.getEnvInfo();
  for (const cfg of config.getProjects()) {
    const includeFiles = path.join(projectPath, cfg.includes[0]);
    const opsGenDirectory = cfg.amplifyExtension.docsFilePath
      ? path.join(projectPath, cfg.amplifyExtension.docsFilePath)
      : path.dirname(path.dirname(includeFiles));
    const schemaPath = path.join(projectPath, cfg.schema);

    generate(schemaPath, opsGenDirectory, {
      maxDepth: cfg.amplifyExtension.maxDepth,
      language: cfg.amplifyExtension.codeGenTarget,
      fragments: cfg.amplifyExtension.fragments,
      separateFiles: true,
    });

    context.print.info(
      `Generated fragments and statements successfully and saved at ${opsGenDirectory}`
    );
  }
};

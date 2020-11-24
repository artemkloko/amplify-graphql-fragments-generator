declare module "amplify-codegen/src/codegen-config/AmplifyCodeGenConfig" {
  import { Context } from "@aws-amplify/cli/lib/domain/context";
  import { GraphQLProjectConfig, IExtensions } from "graphql-config";

  type AmplifyCodeGenProjectConfig = {
    schema: string;
    schemaPath: string;
    includes: string[];
    excludes: string[];
    amplifyExtension: {
      codeGenTarget: "typescript" | string;
      generatedFileName: string;
      docsFilePath?: string;
    };
    extensions: IExtensions;
    projectName: string;
  };

  class AmplifyCodeGenConfig {
    constructor(context: Context, withoutInit: boolean);
    static isValidAmplifyProject(project): boolean;
    save();
    getProjects(): AmplifyCodeGenProjectConfig[];
    addProject(): false | undefined;
    removeProject(projectName): boolean;
    static normalizePath(proj): AmplifyCodeGenProjectConfig;
    fixOldConfig();
  }

  export default AmplifyCodeGenConfig;
}

declare module "amplify-codegen/src/codegen-config" {
  import { Context } from "@aws-amplify/cli/lib/domain/context";
  import { AmplifyCodeGenProjectConfig } from "amplify-codegen/src/codegen-config/AmplifyCodeGenConfig";

  const loadConfig = (context: Context, withoutInit: boolean) =>
    AmplifyCodeGenProjectConfig;

  export default loadConfig;
}

declare module "*.json" {
  const value: any;
  export default value;
}

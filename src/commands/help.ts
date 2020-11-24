import { Context } from "@aws-amplify/cli/lib/domain/context";

import amplifyPluginJson from "../../amplify-plugin.json";

export const run = async (context: Context) => {
  /**
   * Copied from
   * amplify-cli/packages/amplify-category-api/src/commands/api.js
   */
  const header = `amplify ${amplifyPluginJson.name} <subcommands>`;
  const commands = [
    {
      name: "generate",
      description: "Generates GraphQL fragments and statements(query, mutations and subscriptions) for the provided introspection schema",
    },
    {
      name: "help",
      description: `Prints this message`,
    },
    {
      name: "version",
      description: `Prints version info`,
    },
  ];

  context.amplify.showHelp(header, commands);
  context.print.info("");
};

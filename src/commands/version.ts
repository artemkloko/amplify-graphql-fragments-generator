import { Context } from "@aws-amplify/cli/lib/domain/context";

import packageJson from "../../package.json";

export const run = async (context: Context) => {
  context.print.info(packageJson.version);
};

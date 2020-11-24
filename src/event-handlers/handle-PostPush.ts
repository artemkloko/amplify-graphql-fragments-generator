import inquirer from "inquirer";

import { Context } from "@aws-amplify/cli/lib/domain/context";
import { AmplifyEventArgs } from "@aws-amplify/cli/lib/domain/amplify-event";

import { run as cmdGenerate } from "../commands/generate";

export const run = async (context: Context, args: AmplifyEventArgs) => {
  /**
   * This is loosely copied from
   * amplify-cli/packages/amplify-codegen/src/callbacks/prePushUpdateCallback.js
   */
  const shouldGenerate = await askUpdate();
  if (shouldGenerate) {
    cmdGenerate(context);
  }
};

const askUpdate = async () => {
  /**
   * This is loosely copied from
   * amplify-cli/packages/amplify-codegen/src/walkthrough/questions/updateCode.js
   */
  const answer = await inquirer.prompt<{ confirmUpdateCode: boolean }>([
    {
      name: "confirmUpdate",
      message: "Do you want to update code for your updated GraphQL API",
      type: "confirm",
      default: true,
    },
  ]);

  return answer.confirmUpdateCode;
};

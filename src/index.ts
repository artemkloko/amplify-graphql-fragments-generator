import * as path from "path";

import { Context } from "@aws-amplify/cli/lib/domain/context";
import { AmplifyEventArgs } from "@aws-amplify/cli/lib/domain/amplify-event";

export * from "./generator";
export * from "./types";

export async function executeAmplifyCommand(context: Context) {
  const commandsDirPath = path.normalize(path.join(__dirname, "commands"));
  if (context.input.command) {
    const commandPath = path.join(commandsDirPath, context.input.command);
    const commandModule = require(commandPath);
    await commandModule.run(context);
  }
}

export async function handleAmplifyEvent(
  context: Context,
  args: AmplifyEventArgs
) {
  const eventHandlersDirPath = path.normalize(
    path.join(__dirname, "event-handlers")
  );
  const eventHandlerPath = path.join(
    eventHandlersDirPath,
    `handle-${args.event}`
  );
  const eventHandlerModule = require(eventHandlerPath);
  await eventHandlerModule.run(context, args);
}

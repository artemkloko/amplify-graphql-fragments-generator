import { Context } from "@aws-amplify/cli/lib/domain/context";
import { AmplifyEventArgs } from "@aws-amplify/cli/lib/domain/amplify-event";
export * from "./generator";
export * from "./types";
export declare function executeAmplifyCommand(context: Context): Promise<void>;
export declare function handleAmplifyEvent(context: Context, args: AmplifyEventArgs): Promise<void>;

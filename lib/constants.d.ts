import { GQLOperationTypeEnum } from "amplify-graphql-docs-generator/lib/generator";
import { Language } from "./types";
export declare const FILE_EXTENSION_MAP: {
    readonly javascript: "js";
    readonly typescript: "ts";
};
export declare const OPERATIONS_FILENAME: {
    readonly query: "queries";
    readonly mutation: "mutations";
    readonly subscription: "subscriptions";
};
export declare const GRAPHQL_SCHEMA_GETTER: {
    readonly query: "getQueryType";
    readonly mutation: "getMutationType";
    readonly subscription: "getSubscriptionType";
};

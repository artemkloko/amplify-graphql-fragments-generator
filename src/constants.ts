import { GQLOperationTypeEnum } from "amplify-graphql-docs-generator/lib/generator";

import { Language } from "./types";

export const FILE_EXTENSION_MAP = {
  [Language.JAVASCRIPT]: "js",
  [Language.TYPESCRIPT]: "ts",
} as const;

export const OPERATIONS_FILENAME = {
  [GQLOperationTypeEnum.QUERY]: "queries",
  [GQLOperationTypeEnum.MUTATION]: "mutations",
  [GQLOperationTypeEnum.SUBSCRIPTION]: "subscriptions",
} as const;

export const GRAPHQL_SCHEMA_GETTER = {
  [GQLOperationTypeEnum.QUERY]: "getQueryType",
  [GQLOperationTypeEnum.MUTATION]: "getMutationType",
  [GQLOperationTypeEnum.SUBSCRIPTION]: "getSubscriptionType",
} as const;

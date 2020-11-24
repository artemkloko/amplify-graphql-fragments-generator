import { GraphQLSchema } from "graphql";

import {
  GQLOperationTypeEnum,
  GQLTemplateFragment,
  GQLTemplateArgInvocation,
  GQLTemplateArgDeclaration,
} from "amplify-graphql-docs-generator/lib/generator";

export enum Language {
  TYPESCRIPT = "typescript",
  JAVASCRIPT = "javascript",
}

export type TemplateFragment = GQLTemplateFragment & {
  fields: TemplateField[];
  variableName: string;
  refs: string[];
};

export type TemplateField = {
  name: string;
  hasBody: boolean;
  fields: TemplateField[];
  fragments: TemplateFragment[];
};

export type TemplateOpBody = TemplateField & {
  args: GQLTemplateArgInvocation[];
};

export type TemplateGenericOp = {
  name: string;
  type: GQLOperationTypeEnum;
  args: GQLTemplateArgDeclaration[];
  body: TemplateOpBody;
  refs: string[];
};

export type Context = {
  schema: GraphQLSchema;
  options: {
    maxDepth: number;
    separateFiles: boolean;
    language: Language;
    fragments: string[];
    useExternalFragmentForS3Object: boolean;
  };
};

import { GraphQLField } from "graphql";
import { pascalCase } from "change-case";

import getArgs from "amplify-graphql-docs-generator/lib/generator/getArgs";
import { GQLOperationTypeEnum } from "amplify-graphql-docs-generator/lib/generator";

import { Context, TemplateGenericOp } from "../types";
import { getBody } from "./getBody";
import { collectRefsFromFields } from "./getFragments";

export const generateOperation = (
  context: Context,
  type: GQLOperationTypeEnum,
  operation: GraphQLField<any, any>
) => {
  /**
   * The following is loosely copied from
   * amplify-cli/packages/amplify-graphql-docs-generator/src/generator/generateOperation.ts
   */
  const name = pascalCase(operation.name);
  const args = getArgs(operation.args);
  const body = getBody(context, operation);
  if (!body) {
    return undefined;
  }
  const refs = collectRefsFromFields([body]);
  const templateOp: TemplateGenericOp = { name, type, args, body, refs };
  return templateOp;
};

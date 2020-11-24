import { GraphQLField } from "graphql";

import { GQLTemplateArgInvocation } from "amplify-graphql-docs-generator/lib/generator";

import { Context, TemplateOpBody } from "../types";
import { getFields } from "./getFields";

export const getBody = (context: Context, op: GraphQLField<any, any>) => {
  /**
   * The following is loosely copied from
   * amplify-cli/packages/amplify-graphql-docs-generator/src/generator/getBody.ts
   */
  const args: Array<GQLTemplateArgInvocation> = op.args.map((arg) => ({
    name: arg.name,
    value: `\$${arg.name}`,
  }));
  const fields = getFields(context, op, context.options.maxDepth);
  const templateOpBody: TemplateOpBody = { args, ...fields };
  return templateOpBody;
};

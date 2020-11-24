import { GraphQLObjectType } from "graphql";
import { camelCase } from "change-case";

import { GQLTemplateField } from "amplify-graphql-docs-generator/lib/generator";

import { Context, TemplateFragment } from "../types";
import { getFields } from "./getFields";
import { collectRefsFromFields } from "./getFragments";

export const getFragment = (
  context: Context,
  typeObj: GraphQLObjectType,
  external: boolean,
  depth?: number,
  name?: string,
  filterFields: Array<GQLTemplateField> = []
) => {
  /**
   * The following is loosely copied from
   * amplify-cli/packages/amplify-graphql-docs-generator/src/generator/getFragment.ts
   */
  const nextDepth = (depth || context.options.maxDepth) - 1;
  const subFields = (typeObj && typeObj.getFields && typeObj.getFields()) || [];
  const filterFieldNames = filterFields.map((f) => f.name);
  const fields = Object.keys(subFields)
    .map((field) => getFields(context, subFields[field], nextDepth))
    .filter((field) => !filterFieldNames.includes(field.name));

  if (fields.length) {
    name = name || typeObj.name;
    const refs = collectRefsFromFields(fields);

    const templateFragment: TemplateFragment = {
      on: typeObj.name,
      fields,
      external,
      name,
      variableName: camelCase(`${name}Fragment`),
      refs,
    };
    return templateFragment;
  }
  return undefined;
};

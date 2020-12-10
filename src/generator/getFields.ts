import {
  GraphQLField,
  isObjectType,
  isInterfaceType,
  isUnionType,
  isEnumType,
  isScalarType,
} from "graphql";

import getType from "amplify-graphql-docs-generator/lib/generator/utils/getType";
import isS3Object from "amplify-graphql-docs-generator/lib/generator/utils/isS3Object";

import { Context, TemplateField, TemplateFragment } from "../types";
import { getFragment } from "./getFragment";

export const getFields = (
  context: Context,
  field: GraphQLField<any, any>,
  depth: number
) => {
  /**
   * The following is loosely copied from
   * amplify-cli/packages/amplify-graphql-docs-generator/src/generator/getFields.ts
   */
  const fieldType = getType(field.type);
  const isFragment = context.options.fragments?.includes(fieldType.name);
  const renderS3FieldFragment =
    context.options.useExternalFragmentForS3Object && isS3Object(fieldType);
  const subFields =
    !isFragment && isObjectType(fieldType) ? fieldType.getFields() : {};
  const subFragments: any =
    isInterfaceType(fieldType) || isUnionType(fieldType)
      ? context.schema.getPossibleTypes(fieldType)
      : {};

  if (
    depth < 1 &&
    !(isScalarType(fieldType) || isEnumType(fieldType))
  ) {
    return undefined;
  }

  const fields = Object.keys(subFields)
    .map((fieldName) => {
      const subField = subFields[fieldName];
      return getFields(context, subField, depth - 1);
    })
    .filter((f): f is TemplateField => !!f);
  const fragments = Object.keys(subFragments)
    .map((fragment) =>
      getFragment(
        context,
        subFragments[fragment],
        false,
        depth,
        undefined,
        fields
      )
    )
    .filter((f): f is TemplateFragment => !!f);

  // Special treatment for S3 input
  // Swift SDK needs S3 Object to have fragment
  if (renderS3FieldFragment && isObjectType(fieldType)) {
    const fragment = getFragment(context, fieldType, true, depth, "S3Object");
    fragment && fragments.push(fragment);
  }

  if (isFragment && isObjectType(fieldType)) {
    const fragment = getFragment(context, fieldType, true, depth);
    fragment && fragments.push(fragment);
  }

  // if the current field is an object and none of the subfields are included, don't include the field itself
  if (
    !(isFragment || isScalarType(fieldType) || isEnumType(fieldType)) &&
    fields.length === 0 &&
    fragments.length === 0 &&
    !renderS3FieldFragment
  ) {
    return undefined;
  }

  const templateField: TemplateField = {
    name: field.name,
    fields,
    fragments,
    hasBody: !!(fields.length || fragments.length),
  };

  return templateField;
};

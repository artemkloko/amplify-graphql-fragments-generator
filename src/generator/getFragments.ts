import { isObjectType } from "graphql";

import getType from "amplify-graphql-docs-generator/lib/generator/utils/getType";

import { Context, TemplateField, TemplateFragment } from "../types";
import { getFragment } from "./getFragment";

/**
 * Collects unique fragment refs by combining the refs of provided fields.
 */
export const collectSubRefs = (fields: { refs: string[] }[]) => {
  let refs: string[] = [];
  for (const field of fields) {
    unshiftUnique(refs, field.refs);
  }
  return refs;
};

/**
 * Collects unique fragment refs by searching through the subFields and
 * subFragments of the provided fields. The returned refs are ordered by
 * reference hierarchy (ie. the deepest/smallest refs will be first).
 */
export const collectRefsFromFields = (fields: TemplateField[]) => {
  const refs: string[] = [];
  for (const field of fields) {
    /**
     * Check the field's fragments
     */
    field.fragments.forEach((fragment) => {
      if (fragment.external) {
        unshiftUnique(refs, [fragment.variableName]);
      } else {
        /**
         * If the fragment is not external (ie. will be spread printed), check
         * if it has any subRefs
         */
        const subFragments = collectRefsFromFields(fragment.fields);
        unshiftUnique(refs, subFragments);
      }
    });
    /**
     * Check if the field has any subRefs
     */
    const subFragments = collectRefsFromFields(field.fields);
    unshiftUnique(refs, subFragments);
  }
  return refs;
};

/**
 * Creates extrarnal fragments for fragment names of the provided context. The
 * returned fragments are orderded by reference hierarchy (ie. the
 * deepest/smallest fragments will be first).
 */
export const getFragments = (context: Context) => {
  if (!context.options.fragments) {
    return [];
  }

  const fragments: Record<string, TemplateFragment> = {};

  for (const name of context.options.fragments) {
    /**
     * Loop through the provided fragment names and check that they are of
     * GraphQLObjectType
     */
    const namedType = context.schema.getType(name);
    if (namedType) {
      const objectType = getType(namedType);
      if (isObjectType(objectType)) {
        /**
         * Create an external fragment and add to collection
         */
        const fragment = getFragment(context, objectType, true);
        if (fragment) {
          fragments[fragment.variableName] = fragment;
        }
      }
    }
  }

  let order: string[] = [];
  for (const fragment of Object.values(fragments)) {
    /**
     * Collect the refs for each fragment
     */
    const refs = collectRefsFromFields(fragment.fields);
    /**
     * If the current fragment is not already included, add it to the end of the
     * currently collected refs
     */
    if (
      !refs.includes(fragment.variableName) &&
      !order.includes(fragment.variableName)
    ) {
      refs.push(fragment.variableName);
      console.log('adding ref', fragment.variableName);
      
    }
    /**
     * Add to collection the collected refs that are not already threre
     */
    order = [...order, ...refs.filter((ref) => !order.includes(ref))];
  }

  return order.map((name) => fragments[name]);
};

/**
 * Unshifts values to the accumulator. If a value is already in the accumulator,
 * it will be moved to beginning. The returned array contains only unique values.
 */
const unshiftUnique = (acc: string[], values: string[]) => {
  for (const value of values) {
    const index = acc.indexOf(value);
    if (index > -1) {
      acc.splice(index, 1);
    }
    acc.unshift(value);
  }
};

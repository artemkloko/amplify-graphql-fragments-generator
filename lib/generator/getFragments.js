"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFragments = exports.collectRefsFromFields = exports.collectSubRefs = void 0;
const graphql_1 = require("graphql");
const getType_1 = __importDefault(require("amplify-graphql-docs-generator/lib/generator/utils/getType"));
const getFragment_1 = require("./getFragment");
/**
 * Collects unique fragment refs by combining the refs of provided fields.
 */
const collectSubRefs = (fields) => {
    let refs = [];
    for (const field of fields) {
        unshiftUnique(refs, field.refs);
    }
    return refs;
};
exports.collectSubRefs = collectSubRefs;
/**
 * Collects unique fragment refs by searching through the subFields and
 * subFragments of the provided fields. The returned refs are ordered by
 * reference hierarchy (ie. the deepest/smallest refs will be first).
 */
const collectRefsFromFields = (fields) => {
    const refs = [];
    for (const field of fields) {
        /**
         * Check the field's fragments
         */
        field.fragments.forEach((fragment) => {
            if (fragment.external) {
                unshiftUnique(refs, [fragment.variableName]);
            }
            else {
                /**
                 * If the fragment is not external (ie. will be spread printed), check
                 * if it has any subRefs
                 */
                const subFragments = exports.collectRefsFromFields(fragment.fields);
                unshiftUnique(refs, subFragments);
            }
        });
        /**
         * Check if the field has any subRefs
         */
        const subFragments = exports.collectRefsFromFields(field.fields);
        unshiftUnique(refs, subFragments);
    }
    return refs;
};
exports.collectRefsFromFields = collectRefsFromFields;
/**
 * Creates extrarnal fragments for fragment names of the provided context. The
 * returned fragments are orderded by reference hierarchy (ie. the
 * deepest/smallest fragments will be first).
 */
const getFragments = (context) => {
    if (!context.options.fragments) {
        return [];
    }
    const fragments = {};
    for (const name of context.options.fragments) {
        /**
         * Loop through the provided fragment names and check that they are of
         * GraphQLObjectType
         */
        const namedType = context.schema.getType(name);
        if (namedType) {
            const objectType = getType_1.default(namedType);
            if (graphql_1.isObjectType(objectType)) {
                /**
                 * Create an external fragment and add to collection
                 */
                const fragment = getFragment_1.getFragment(context, objectType, true);
                if (fragment) {
                    fragments[fragment.variableName] = fragment;
                }
            }
        }
    }
    let order = [];
    for (const fragment of Object.values(fragments)) {
        /**
         * Collect the refs for each fragment
         */
        const refs = exports.collectRefsFromFields(fragment.fields);
        /**
         * If the current fragment is not already included, add it to the end of the
         * currently collected refs
         */
        if (!refs.includes(fragment.variableName) &&
            !order.includes(fragment.variableName)) {
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
exports.getFragments = getFragments;
/**
 * Unshifts values to the accumulator. If a value is already in the accumulator,
 * it will be moved to beginning. The returned array contains only unique values.
 */
const unshiftUnique = (acc, values) => {
    for (const value of values) {
        const index = acc.indexOf(value);
        if (index > -1) {
            acc.splice(index, 1);
        }
        acc.unshift(value);
    }
};
//# sourceMappingURL=getFragments.js.map
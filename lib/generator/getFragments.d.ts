import { Context, TemplateField, TemplateFragment } from "../types";
/**
 * Collects unique fragment refs by combining the refs of provided fields.
 */
export declare const collectSubRefs: (fields: {
    refs: string[];
}[]) => string[];
/**
 * Collects unique fragment refs by searching through the subFields and
 * subFragments of the provided fields. The returned refs are ordered by
 * reference hierarchy (ie. the deepest/smallest refs will be first).
 */
export declare const collectRefsFromFields: (fields: TemplateField[]) => string[];
/**
 * Creates extrarnal fragments for fragment names of the provided context. The
 * returned fragments are orderded by reference hierarchy (ie. the
 * deepest/smallest fragments will be first).
 */
export declare const getFragments: (context: Context) => TemplateFragment[];

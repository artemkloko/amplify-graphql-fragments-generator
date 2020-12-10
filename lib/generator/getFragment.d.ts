import { GraphQLObjectType } from "graphql";
import { GQLTemplateField } from "amplify-graphql-docs-generator/lib/generator";
import { Context, TemplateFragment } from "../types";
export declare const getFragment: (context: Context, typeObj: GraphQLObjectType, external: boolean, depth?: number | undefined, name?: string | undefined, filterFields?: Array<GQLTemplateField>) => TemplateFragment | undefined;

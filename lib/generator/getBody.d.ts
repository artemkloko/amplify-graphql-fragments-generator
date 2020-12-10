import { GraphQLField } from "graphql";
import { Context, TemplateOpBody } from "../types";
export declare const getBody: (context: Context, op: GraphQLField<any, any>) => TemplateOpBody | undefined;

import { GraphQLField } from "graphql";
import { Context, TemplateField } from "../types";
export declare const getFields: (context: Context, field: GraphQLField<any, any>, depth: number) => TemplateField | undefined;

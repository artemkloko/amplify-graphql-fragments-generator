import { GraphQLField } from "graphql";
import { GQLOperationTypeEnum } from "amplify-graphql-docs-generator/lib/generator";
import { Context, TemplateGenericOp } from "../types";
export declare const generateOperation: (context: Context, type: GQLOperationTypeEnum, operation: GraphQLField<any, any>) => TemplateGenericOp | undefined;

import { GraphQLSchema } from "graphql";
import { GQLDocsGenOptions, GQLOperationTypeEnum, GQLTemplateOp } from "amplify-graphql-docs-generator/lib/generator";
export declare function generateAllOps(schemaDoc: GraphQLSchema, maxDepth: number, options: GQLDocsGenOptions & {
    fragments: string[];
}): {
    operationsTypesMap: Record<GQLOperationTypeEnum, GQLTemplateOp[]>;
    fragments: (import("amplify-graphql-docs-generator/lib/generator").GQLTemplateFragment & {
        refs: string[];
    })[];
};

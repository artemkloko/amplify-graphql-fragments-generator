import { GraphQLSchema } from "graphql";
import { GQLDocsGenOptions } from "amplify-graphql-docs-generator/lib/generator";
import { GQLOperationsAndRefs } from "../types";
export declare function generateAllOps(schemaDoc: GraphQLSchema, maxDepth: number, options: GQLDocsGenOptions & {
    fragments: string[];
}): {
    operationsTypesMap: {
        query?: GQLOperationsAndRefs | undefined;
        mutation?: GQLOperationsAndRefs | undefined;
        subscription?: GQLOperationsAndRefs | undefined;
    };
    fragments: (import("amplify-graphql-docs-generator/lib/generator").GQLTemplateFragment & {
        refs: string[];
    })[];
    refs: string[];
};

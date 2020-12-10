import { GraphQLSchema } from "graphql";
import { GQLOperationTypeEnum, GQLTemplateFragment, GQLTemplateArgInvocation, GQLTemplateArgDeclaration } from "amplify-graphql-docs-generator/lib/generator";
export declare enum Language {
    TYPESCRIPT = "typescript",
    JAVASCRIPT = "javascript"
}
export declare type TemplateFragment = GQLTemplateFragment & {
    fields: TemplateField[];
    variableName: string;
    refs: string[];
};
export declare type TemplateField = {
    name: string;
    hasBody: boolean;
    fields: TemplateField[];
    fragments: TemplateFragment[];
};
export declare type TemplateOpBody = TemplateField & {
    args: GQLTemplateArgInvocation[];
};
export declare type TemplateGenericOp = {
    name: string;
    type: GQLOperationTypeEnum;
    args: GQLTemplateArgDeclaration[];
    body: TemplateOpBody;
    refs: string[];
};
export declare type Context = {
    schema: GraphQLSchema;
    options: {
        maxDepth: number;
        separateFiles: boolean;
        language: Language;
        fragments?: string[];
        useExternalFragmentForS3Object: boolean;
    };
};

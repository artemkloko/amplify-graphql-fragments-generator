import { GQLTemplateFragment } from "amplify-graphql-docs-generator/lib/generator";
import { Context, Language, TemplateGenericOp } from "../types";
export declare const render: (context: Context, doc: {
    operations: TemplateGenericOp[];
    fragments?: GQLTemplateFragment[];
    imports: Record<string, string[]>;
}) => string;
export declare const registerPartials: () => void;
export declare const registerHelpers: (language: Language) => void;
export declare const format: (str: string, language: Language) => string;

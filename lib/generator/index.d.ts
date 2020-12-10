export declare const generate: (schemaPath: string, outputPath: string, options: {
    maxDepth: number;
    separateFiles: boolean;
    language: string;
    fragments?: string[];
}) => Promise<void>;

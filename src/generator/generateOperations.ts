import { GQLOperationTypeEnum } from "amplify-graphql-docs-generator/lib/generator";

import { Context, TemplateGenericOp } from "../types";
import { GRAPHQL_SCHEMA_GETTER } from "../constants";
import { generateOperation } from "./generateOperation";

export const generateOperations = (
  context: Context,
  types: GQLOperationTypeEnum[]
) => {
  const operations: TemplateGenericOp[] = [];
  for (const type of types) {
    /**
     * The following is loosely copied from
     * amplify-cli/packages/amplify-graphql-docs-generator/src/generator/generateAllOperations.ts
     */
    const getter = GRAPHQL_SCHEMA_GETTER[type];
    const operationsType = context.schema[getter]();
    if (operationsType) {
      const operationsMap = operationsType.getFields();
      for (const operationName of Object.keys(operationsMap)) {
        const operationTemplate = generateOperation(
          context,
          type,
          operationsMap[operationName]
        );
        operations.push(operationTemplate);
      }
    }
  }
  return operations;
};

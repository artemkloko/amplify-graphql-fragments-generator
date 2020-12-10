"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFields = void 0;
const graphql_1 = require("graphql");
const getType_1 = __importDefault(require("amplify-graphql-docs-generator/lib/generator/utils/getType"));
const isS3Object_1 = __importDefault(require("amplify-graphql-docs-generator/lib/generator/utils/isS3Object"));
const getFragment_1 = require("./getFragment");
const getFields = (context, field, depth) => {
    var _a;
    /**
     * The following is loosely copied from
     * amplify-cli/packages/amplify-graphql-docs-generator/src/generator/getFields.ts
     */
    const fieldType = getType_1.default(field.type);
    const isFragment = (_a = context.options.fragments) === null || _a === void 0 ? void 0 : _a.includes(fieldType.name);
    const renderS3FieldFragment = context.options.useExternalFragmentForS3Object && isS3Object_1.default(fieldType);
    const subFields = !isFragment && graphql_1.isObjectType(fieldType) ? fieldType.getFields() : {};
    const subFragments = graphql_1.isInterfaceType(fieldType) || graphql_1.isUnionType(fieldType)
        ? context.schema.getPossibleTypes(fieldType)
        : {};
    if (depth < 1 &&
        !(graphql_1.isScalarType(fieldType) || graphql_1.isEnumType(fieldType))) {
        return undefined;
    }
    const fields = Object.keys(subFields)
        .map((fieldName) => {
        const subField = subFields[fieldName];
        return exports.getFields(context, subField, depth - 1);
    })
        .filter((f) => !!f);
    const fragments = Object.keys(subFragments)
        .map((fragment) => getFragment_1.getFragment(context, subFragments[fragment], false, depth, undefined, fields))
        .filter((f) => !!f);
    // Special treatment for S3 input
    // Swift SDK needs S3 Object to have fragment
    if (renderS3FieldFragment && graphql_1.isObjectType(fieldType)) {
        const fragment = getFragment_1.getFragment(context, fieldType, true, depth, "S3Object");
        fragment && fragments.push(fragment);
    }
    if (isFragment && graphql_1.isObjectType(fieldType)) {
        const fragment = getFragment_1.getFragment(context, fieldType, true, depth);
        fragment && fragments.push(fragment);
    }
    // if the current field is an object and none of the subfields are included, don't include the field itself
    if (!(isFragment || graphql_1.isScalarType(fieldType) || graphql_1.isEnumType(fieldType)) &&
        fields.length === 0 &&
        fragments.length === 0 &&
        !renderS3FieldFragment) {
        return undefined;
    }
    const templateField = {
        name: field.name,
        fields,
        fragments,
        hasBody: !!(fields.length || fragments.length),
    };
    return templateField;
};
exports.getFields = getFields;
//# sourceMappingURL=getFields.js.map
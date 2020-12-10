"use strict";
/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelMessageConnectionFragment = exports.messageFragment = exports.userFragment = void 0;
exports.userFragment = `
  fragment User on User {
    id
    name
    some
    createdAt
    updatedAt
  }
`;
exports.messageFragment = `
  fragment Message on Message {
    id
    name
    text
    createdAt
    chatId
    userId
    updatedAt
    user {
      ...User
    }
  }
  ${exports.userFragment}
`;
exports.modelMessageConnectionFragment = `
  fragment ModelMessageConnection on ModelMessageConnection {
    items {
      ...Message
    }
    nextToken
  }
  ${exports.messageFragment}
`;
//# sourceMappingURL=fragments.js.map
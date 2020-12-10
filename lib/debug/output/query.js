"use strict";
/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.listUsers = exports.listMessagesByUser = exports.listMessagesByChat = exports.listMessages = exports.getMessage = void 0;
const fragments_1 = require("./fragments");
exports.getMessage = `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      ...Message
    }
  }
  ${fragments_1.messageFragment}
`;
exports.listMessages = `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        ...Message
      }
      nextToken
    }
  }
  ${fragments_1.messageFragment}
`;
exports.listMessagesByChat = `
  query ListMessagesByChat(
    $chatId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessagesByChat(
      chatId: $chatId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        ...Message
      }
      nextToken
    }
  }
  ${fragments_1.messageFragment}
`;
exports.listMessagesByUser = `
  query ListMessagesByUser(
    $userId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessagesByUser(
      userId: $userId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        ...Message
      }
      nextToken
    }
  }
  ${fragments_1.messageFragment}
`;
exports.listUsers = `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        ...User
      }
      nextToken
    }
  }
  ${fragments_1.userFragment}
`;
exports.getUser = `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      ...User
    }
  }
  ${fragments_1.userFragment}
`;
//# sourceMappingURL=query.js.map
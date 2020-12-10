"use strict";
/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.deleteMessage = exports.updateMessage = exports.createMessage = void 0;
const fragments_1 = require("./fragments");
exports.createMessage = `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      ...Message
    }
  }
  ${fragments_1.messageFragment}
`;
exports.updateMessage = `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      ...Message
    }
  }
  ${fragments_1.messageFragment}
`;
exports.deleteMessage = `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      ...Message
    }
  }
  ${fragments_1.messageFragment}
`;
exports.createUser = `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      ...User
    }
  }
  ${fragments_1.userFragment}
`;
exports.updateUser = `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      ...User
    }
  }
  ${fragments_1.userFragment}
`;
exports.deleteUser = `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      ...User
    }
  }
  ${fragments_1.userFragment}
`;
//# sourceMappingURL=mutations.js.map
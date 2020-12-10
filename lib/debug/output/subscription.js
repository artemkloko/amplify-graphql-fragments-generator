"use strict";
/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDeleteUser = exports.onUpdateUser = exports.onCreateUser = exports.onDeleteMessage = exports.onUpdateMessage = exports.onCreateMessage = exports.onUpdateMessageByChat = exports.onDeleteMessageByChat = exports.onCreateMessageByChat = void 0;
const fragments_1 = require("./fragments");
exports.onCreateMessageByChat = `
  subscription OnCreateMessageByChat($chatId: ID!) {
    onCreateMessageByChat(chatId: $chatId) {
      ...Message
    }
  }
  ${fragments_1.messageFragment}
`;
exports.onDeleteMessageByChat = `
  subscription OnDeleteMessageByChat($chatId: ID!) {
    onDeleteMessageByChat(chatId: $chatId) {
      ...Message
    }
  }
  ${fragments_1.messageFragment}
`;
exports.onUpdateMessageByChat = `
  subscription OnUpdateMessageByChat($chatId: ID!) {
    onUpdateMessageByChat(chatId: $chatId) {
      ...Message
    }
  }
  ${fragments_1.messageFragment}
`;
exports.onCreateMessage = `
  subscription OnCreateMessage {
    onCreateMessage {
      ...Message
    }
  }
  ${fragments_1.messageFragment}
`;
exports.onUpdateMessage = `
  subscription OnUpdateMessage {
    onUpdateMessage {
      ...Message
    }
  }
  ${fragments_1.messageFragment}
`;
exports.onDeleteMessage = `
  subscription OnDeleteMessage {
    onDeleteMessage {
      ...Message
    }
  }
  ${fragments_1.messageFragment}
`;
exports.onCreateUser = `
  subscription OnCreateUser {
    onCreateUser {
      ...User
    }
  }
  ${fragments_1.userFragment}
`;
exports.onUpdateUser = `
  subscription OnUpdateUser {
    onUpdateUser {
      ...User
    }
  }
  ${fragments_1.userFragment}
`;
exports.onDeleteUser = `
  subscription OnDeleteUser {
    onDeleteUser {
      ...User
    }
  }
  ${fragments_1.userFragment}
`;
//# sourceMappingURL=subscription.js.map
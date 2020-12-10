"use strict";
/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten
Object.defineProperty(exports, "__esModule", { value: true });
exports.bar = exports.foo = exports.getSomething = exports.getUsers = exports.getUser = exports.getLanguages = exports.getLanguage = exports.messageFragment = exports.userFragment = exports.locationFragment = void 0;
exports.locationFragment = `
  fragment Location on Location {
    lat
    lon
  }
`;
exports.userFragment = `
  fragment User on User {
    language {
      name
      location {
        ...Location
      }
    }
  }
  ${exports.locationFragment}
`;
exports.messageFragment = `
  fragment Message on Message {
    location {
      ...Location
    }
    user {
      ...User
    }
    language {
      name
      location {
        ...Location
      }
    }
  }
  ${exports.locationFragment}
  ${exports.userFragment}
`;
exports.getLanguage = `
  query GetLanguage {
    getLanguage {
      name
      location {
        ...Location
      }
    }
  }
  ${exports.locationFragment}
`;
exports.getLanguages = `
  query GetLanguages {
    getLanguages {
      items {
        ...Location
      }
      nextToken
    }
  }
  ${exports.locationFragment}
`;
exports.getUser = `
  query GetUser {
    getUser {
      ...User
    }
  }
  ${exports.userFragment}
`;
exports.getUsers = `
  query GetUsers {
    getUsers {
      items {
        ...User
      }
      nextToken
      image {
        bucket
        region
        key
      }
    }
  }
  ${exports.userFragment}
`;
exports.getSomething = `
  query GetSomething {
    getSomething {
      ... on Language {
        name
        location {
          ...Location
        }
      }
      ... on User {
        language {
          name
          location {
            ...Location
          }
        }
      }
    }
  }
  ${exports.locationFragment}
`;
exports.foo = `
  mutation Foo {
    foo
  }
`;
exports.bar = `
  subscription Bar {
    bar
  }
`;
//# sourceMappingURL=output.js.map
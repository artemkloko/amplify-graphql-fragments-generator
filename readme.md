# amplify-graphql-fragments-generator

Generate GraphQL fragments and statements(query, mutations and subscriptions) for the provided introspection schema.

---

This plugin is based on `amplify-graphql-docs-generator@2.1.16` with some parts loosely copied and updated. This strategy was chosen as there is no easy way to extend `amplify-graphql-docs-generator` with custom functionality.

## Setup

Install the plugin globally and add it to Amplify cli

```sh
yarn global add amplify-graphql-fragments-generator
amplify plugin add amplify-graphql-fragments-generator
```

Add `fragments` to `.graphqlconfig.yml` of your Amplify project

```yml
projects:
  chat:
    schemaPath: amplify/backend/api/chat/build/schema.graphql
    includes:
      - src/graphql/statements/*.ts
    excludes:
      - amplify/**
    extensions:
      amplify:
        maxDepth: 2
        codeGenTarget: typescript
        generatedFileName: src/@types/graphql.ts
        docsFilePath: src/graphql/statements
        fragments: 
          - User
          - Message
extensions:
  amplify:
    version: 3
```

## Usage

After pushing the API - run `amplify codegen-with-fragments generate`

```sh
amplify push api
amplify codegen-with-fragments generate
```

Check out your `docsFilePath` for the results

## Example results

If we have the following `schema.graphql`

```graphql
type Location {
  lat: Float!
  lon: Float!
}

type Language {
  name: String!
  location: Location!
}

type User {
  language: Language!
}

type Users {
  items: [User]
  nextToken: String
}

type Message {
  location: Location!
  user: User!
  language: Language!
}

type Query {
  getUsers: Users
  getLanguage: Language
}

type Mutation {
  foo: String
}

type Subscription {
  bar: String
}

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
```

And specify `["Message", "Location", "User"]` as fragments in `.graphqlconfig.yml` 

```yml
projects:
  chat:
    schemaPath: amplify/backend/api/chat/build/schema.graphql
    includes:
      - src/graphql/statements/*.ts
    excludes:
      - amplify/**
    extensions:
      amplify:
        maxDepth: 2
        codeGenTarget: typescript
        generatedFileName: src/@types/graphql.ts
        docsFilePath: src/graphql/statements
        fragments: 
          - Message
          - Location
          - User
extensions:
  amplify:
    version: 3
```

We will get the following `fragments.ts`

```typescript
/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const locationFragment = /* GraphQL */ `
  fragment Location on Location {
    lat
    lon
  }
`;

export const userFragment = /* GraphQL */ `
  fragment User on User {
    language {
      name
      location {
        ...Location
      }
    }
  }
  ${locationFragment}
`;

export const messageFragment = /* GraphQL */ `
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
  ${locationFragment}
  ${userFragment}
`;
```

And the following `queries.ts`

```typescript
/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import { locationFragment, userFragment } from "./fragments";

export const getUsers = /* GraphQL */ `
  query GetUsers {
    getUsers {
      items {
        ...User
      }
      nextToken
    }
  }
  ${userFragment}
`;

export const getLanguage = /* GraphQL */ `
  query GetLanguage {
    getLanguage {
      name
      location {
        ...Location
      }
    }
  }
  ${locationFragment}
`;
```
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

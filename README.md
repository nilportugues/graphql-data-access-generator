# GraphQL Data Access Generator

This project's goal is to generate all queries, mutation, subscriptions, fragments and types for any GraphQL schema.

## Installation

This is a development tool, so make sure you install it with `--save-dev` or `-D`.

```
npm install graphql-data-access-generator --save-dev

yarn add -D graphql-data-access-generator
```

## How it works? 

1. Provide a `graphqlUrl` and optionally the required headers to authenticate. 
2. Provide a `schemaFile` location to download the current GraphQL schema.
3. Provide a `destinationPath` where all generated code will be outputed (it will be TypeScript). 

```js
const generator = require('graphql-data-access-generator')

async function main () {
  await generator({
    graphqlUrl: "http://0.0.0.0:8055/graphql",
    schemaFile: "/tmp/schema.graphql",
    headers: { 
      "Authorization": "Bearer graphql-admin" 
    },
    destinationPath: __dirname + "/generated",
  });
}

main()
```

## Distribution file

The current bundle size for this repository is `5MB`. All of it belongs to `dist/index.js`. 

The reason behind this file size is we're using `@vercel/ncc` to generate one file with all the dependencies embedded to the generated `dist/index.js` file. This makes this package have no real dependencies when being installed in your project.

Working with this approach enables us to use this piece of software today and in the future, as we can guarantee it will not collide with different library versions and breaking changes that could potentally be introduced in the future.
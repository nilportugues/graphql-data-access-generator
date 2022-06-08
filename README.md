# GraphQL Data Access Generator

This project's goal is to generate all queries, mutation, subscriptions, fragments and types for any GraphQL schema.

## How it works? 

1. Provide a `graphqlUrl` and optionally the required headers to authenticate. 
2. Provide a `schemaFile` location to download the current GraphQL schema.
3. Provide a `destinationPath` where all generated code will be outputed (it will be TypeScript). 

```js
const generator = require('@nilportugues/graphql-data-access-generator')

async function () {
  await generator({
    graphqlUrl: "http://0.0.0.0:8055/graphql",
    schemaFile: "/tmp/schema.graphql",
    headers: { 
      "Authorization": "Bearer graphql-admin" 
    },
    destinationPath: __dirname + "/generated",
  });
}
```

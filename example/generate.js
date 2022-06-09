const generator = require('../dist/index')

async function main() {
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
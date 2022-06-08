const generateGraphqlCode = require("./graphql/generate-code");
const getSchema = require("./graphql/download-schema");
const GenerateFragments = require("./graphql/generate-fragments");
const generateTypes = require("./graphql/generate-types");

//const graphqlUrl = "http://0.0.0.0:8055/graphql";
//const headers = { Authorization: "Bearer graphql-admin" };
//const destDirPath = __dirname + "/out";
//const schemaFile = "/tmp/schema.graphql";

module.exports = async function main({
  graphqlUrl,
  headers,
  destinationPath,
  schemaFile,
}) {
  //1 - Generate schema
  await getSchema(schemaFile, graphqlUrl, headers);

  //2 - Generate query, mutation and subscription code
  await generateGraphqlCode({
    schemaFilePath: schemaFile,
    depthLimit: 2,
    destDirPath: destinationPath,
  });

  //3 - Generate fragments
  const generateFragments = new GenerateFragments();
  await generateFragments.processFragments(
    schemaFile,
    destinationPath + "/fragments/",
    "index.ts"
  );

  //3 - Generate types
  await generateTypes(schemaFile, destinationPath + "/types.ts");
};

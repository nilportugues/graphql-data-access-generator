const { codegen } = require("@graphql-codegen/core");
const { buildSchema, printSchema, parse } = require("graphql");
const fs = require("fs");
const typescriptPlugin = require("@graphql-codegen/typescript");

module.exports = async function (schemaFile, outputFile) {
  const schema = buildSchema(fs.readFileSync(schemaFile).toString());
  const config = {
    documents: [],
    config: {},
    // used by a plugin internally, although the 'typescript' plugin currently
    // returns the string output, rather than writing to a file
    filename: outputFile,
    schema: parse(printSchema(schema)),
    plugins: [
      // Each plugin should be an object
      {
        typescript: {}, // Here you can pass configuration to the plugin
      },
    ],
    pluginMap: {
      typescript: typescriptPlugin,
    },
  };

  const output = await codegen(config);
  fs.writeFileSync(outputFile, output);
};

const fs = require("fs-extra");
const fetch = require("node-fetch");
const {
  getIntrospectionQuery,
  printSchema,
  buildClientSchema,
} = require("graphql/utilities");

module.exports = async function (filepath, graphqlUrl, headers = {}) {
  const graphql = JSON.stringify({
    query: getIntrospectionQuery().replace(/\n/g, ""),
    variables: {},
  });
  const requestOptions = {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: graphql,
    redirect: "follow",
  };

  const schema = await fetch(graphqlUrl, requestOptions)
    .then((response) => response.json())
    .then((response) => response.data);

  fs.writeFileSync(filepath, printSchema(buildClientSchema(schema)));
};

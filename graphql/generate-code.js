const fs = require("fs-extra");
const path = require("path");
const { Source, buildSchema } = require("graphql");
const del = require("del");

/**
 * Generate variables string
 * @param dict dictionary of arguments
 */
const getArgsToVarsStr = (dict) =>
  Object.entries(dict)
    .map(([varName, arg]) => `${arg.name}: $${varName}`)
    .join(", ");

/**
 * Generate types string
 * @param dict dictionary of arguments
 */
const getVarsToTypesStr = (dict) =>
  Object.entries(dict)
    .map(([varName, arg]) => `$${varName}: ${arg.type}`)
    .join(", ");

/**
 * Generate the query for the specified field
 * @param curName name of the current field
 * @param curParentType parent type of the current field
 * @param curParentName parent name of the current field
 * @param argumentsDict dictionary of arguments from all fields
 * @param duplicateArgCounts map for deduping argument name collisions
 * @param crossReferenceKeyList list of the cross reference
 * @param curDepth current depth of field
 * @param fromUnion adds additional depth for unions to avoid empty child
 */
const generateQuery = (
  optype,
  gqlSchema,
  depthLimit,
  includeDeprecatedFields,
  includeCrossReferences,
  curName,
  curParentType,
  curParentName,
  argumentsDict = {},
  duplicateArgCounts = {},
  crossReferenceKeyList = [], // [`${curParentName}To${curName}Key`]
  curDepth = 1,
  fromUnion = false
) => {
  const field = gqlSchema.getType(curParentType).getFields()[curName];
  const curTypeName = field.type.toJSON().replace(/[[\]!]/g, "");
  const curType = gqlSchema.getType(curTypeName);
  let queryStr = "";
  let childQuery = "";
  let fragments = "";

  if (curType.getFields) {
    const crossReferenceKey = `${curParentName}To${curName}Key`;
    if (
      (!includeCrossReferences &&
        crossReferenceKeyList.indexOf(crossReferenceKey) !== -1) ||
      (fromUnion ? curDepth - 2 : curDepth) > depthLimit
    ) {
      return "";
    }

    if (!fromUnion) {
      crossReferenceKeyList.push(crossReferenceKey);
    }

    const childKeys = Object.keys(curType.getFields());
    childQuery = childKeys
      .filter((fieldName) => !fieldName.endsWith("_func"))
      .filter((fieldName) => {
        /* Exclude deprecated fields */
        const fieldSchema = gqlSchema.getType(curType).getFields()[fieldName];
        return includeDeprecatedFields || !fieldSchema.deprecationReason;
      })
      .map(
        (cur) =>
          generateQuery(
            optype,
            gqlSchema,
            depthLimit,
            includeDeprecatedFields,
            includeCrossReferences,
            cur,
            curType,
            curName,
            argumentsDict,
            duplicateArgCounts,
            crossReferenceKeyList,
            curDepth + 1,
            fromUnion
          ).queryStr
      )
      .filter((cur) => Boolean(cur))
      .join("\n");
  }

  if (!(curType.getFields && !childQuery)) {
    queryStr = `${"    ".repeat(curDepth)}${field.name}`;

    if (field.args.length > 0 && curDepth < 2) {
      const dict = getFieldArgsDict(field, duplicateArgCounts, argumentsDict);
      Object.assign(argumentsDict, dict);

      queryStr += `(${getArgsToVarsStr(dict)})`;
    }

    if (childQuery) {
      

      if (curType.astNode && curType.astNode.kind === "ObjectTypeDefinition") {
        queryStr += `{\n...${curType.name}\n${"    ".repeat(curDepth)} }`;
        fragments += `\${${curType.name}}`;
      } else {
        queryStr += `{\n${childQuery}\n${"    ".repeat(curDepth)} }`;
      }

    }
  }

  /* Union types */
  if (curType.astNode && curType.astNode.kind === "UnionTypeDefinition") {
    const types = curType.getTypes();
    if (types && types.length) {
      const indent = `${"    ".repeat(curDepth)}`;
      const fragIndent = `${"    ".repeat(curDepth + 1)}`;
      queryStr += "{\n";

      for (let i = 0, len = types.length; i < len; i++) {
        const valueTypeName = types[i];
        const valueType = gqlSchema.getType(valueTypeName);
        const unionChildQuery = Object.keys(valueType.getFields())
          .map(
            (cur) =>
              generateQuery(
                optype,
                gqlSchema,
                depthLimit,
                includeDeprecatedFields,
                includeCrossReferences,
                cur,
                valueType,
                curName,
                argumentsDict,
                duplicateArgCounts,
                crossReferenceKeyList,
                curDepth + 2,
                true
              ).queryStr
          )
          .filter((cur) => Boolean(cur))
          .join("\n");

        /* Exclude empty unions */
        if (unionChildQuery) {
          queryStr += `${fragIndent}... on ${valueTypeName} {\n${unionChildQuery}\n${fragIndent}}\n`;
        }
      }
      queryStr += `${indent}}`;
    }
  }

  return { queryStr: "{\n" + queryStr + "\n}\n" + fragments, argumentsDict };
};

/**
 * Generate the query for the specified field
 * @param obj one of the root objects(Query, Mutation, Subscription)
 * @param description description of the current object
 */
const generateFile = (
  destDirPath,
  depthLimit,
  includeDeprecatedFields,
  fileExtension,
  includeCrossReferences,
  gqlSchema,
  obj,
  description
) => {
  let indexJs = "";

  let outputFolderName;
  let optype = "";
  switch (true) {
    case /Mutation$/.test(description):
      outputFolderName = "mutations";
      optype = "mutation";
      break;
    case /Query$/.test(description):
      outputFolderName = "queries";
      optype = "query";
      break;
    case /Subscription$/.test(description):
      optype = "subscription";
      outputFolderName = "subscriptions";
      break;
    default:
      console.log("[gqlg warning]:", "description is required");
  }
  const writeFolder = path.join(destDirPath, `./${outputFolderName}`);
  try {
    fs.mkdirSync(writeFolder);
  } catch (err) {
    if (err.code !== "EEXIST") throw err;
  }
  Object.keys(obj).forEach((type) => {
    const field = gqlSchema.getType(description).getFields()[type];
    /* Only process non-deprecated queries/mutations: */
    if (includeDeprecatedFields || !field.deprecationReason) {
      const queryResult = generateQuery(
        optype,
        gqlSchema,
        depthLimit,
        includeDeprecatedFields,
        includeCrossReferences,
        type,
        description
      );
      const varsToTypesStr = getVarsToTypesStr(queryResult.argumentsDict);
      let query = queryResult.queryStr;
      let queryName;
      let OP = "";
      switch (true) {
        case /Mutation/.test(description):
          queryName = "mutation";

          break;
        case /Query/.test(description):
          queryName = "query";
          break;
        case /Subscription/.test(description):
          queryName = "subscription";
          break;
        default:
          break;
      }

      query = `${queryName || description.toLowerCase()} ${type}${
        varsToTypesStr ? `(${varsToTypesStr})` : ""
      }${query}\n`;

      //  fs.writeFileSync(path.join(writeFolder, `./${type}.${fileExtension}`), query);
      indexJs += `export const ${OP}${type.toUpperCase()} = \`${query}\n\`\n\n`;
    }
  });

  const imports = [
    ...new Set(
      indexJs
        .split("\n")
        .filter((r) => r.includes("${"))
        .map((r) => r.replace("${", ""))
        .map((r) => r.replace("}", ""))
    ),
  ];

  fs.writeFileSync(
    path.join(writeFolder, "index.ts"),
    `
import { ${imports.join(", ")} } from '../fragments' 

${indexJs}  
      `
  );

  return `export * from './${outputFolderName}';\n`;
};

/**
 * Compile arguments dictionary for a field
 * @param field current field object
 * @param duplicateArgCounts map for deduping argument name collisions
 * @param allArgsDict dictionary of all arguments
 */
const getFieldArgsDict = (field, duplicateArgCounts, allArgsDict = {}) =>
  field.args.reduce((o, arg) => {
    if (arg.name in duplicateArgCounts) {
      const index = duplicateArgCounts[arg.name] + 1;
      duplicateArgCounts[arg.name] = index;
      o[`${arg.name}${index}`] = arg;
    } else if (allArgsDict[arg.name]) {
      duplicateArgCounts[arg.name] = 1;
      o[`${arg.name}1`] = arg;
    } else {
      o[arg.name] = arg;
    }
    return o;
  }, {});

async function generateGraphqlCode({
  schemaFilePath,
  depthLimit = 100,
  destDirPath,
  includeDeprecatedFields = false,
  ext: fileExtension,
  assumeValid,
  includeCrossReferences = false,
}) {
  let assume = false;
  if (assumeValid === "true") {
    assume = true;
  }

  const typeDef = fs.readFileSync(schemaFilePath, "utf-8");
  const source = new Source(typeDef);
  const gqlSchema = buildSchema(source, { assumeValidSDL: assume });

  if (!fs.existsSync(destDirPath)) {
    fs.mkdirpSync(destDirPath);
  }

  del.sync(destDirPath, { force: true });
  path
    .resolve(destDirPath)
    .split(path.sep)
    .reduce((before, cur) => {
      const pathTmp = path.join(before, cur + path.sep);
      if (!fs.existsSync(pathTmp)) {
        fs.mkdirSync(pathTmp);
      }
      return path.join(before, cur + path.sep);
    }, "");
  let indexJsExportAll = "";

  if (gqlSchema.getMutationType()) {
    indexJsExportAll += generateFile(
      destDirPath,
      depthLimit,
      includeDeprecatedFields,
      fileExtension,
      includeCrossReferences,
      gqlSchema,
      gqlSchema.getMutationType().getFields(),
      gqlSchema.getMutationType().name
    );
  }

  if (gqlSchema.getQueryType()) {
    indexJsExportAll += generateFile(
      destDirPath,
      depthLimit,
      includeDeprecatedFields,
      fileExtension,
      includeCrossReferences,
      gqlSchema,
      gqlSchema.getQueryType().getFields(),
      gqlSchema.getQueryType().name
    );
  }

  if (gqlSchema.getSubscriptionType()) {
    indexJsExportAll += generateFile(
      destDirPath,
      depthLimit,
      includeDeprecatedFields,
      fileExtension,
      includeCrossReferences,
      gqlSchema,
      gqlSchema.getSubscriptionType().getFields(),
      gqlSchema.getSubscriptionType().name
    );
  }

  indexJsExportAll += `export * from './types' `;

  fs.writeFileSync(path.join(destDirPath, "index.ts"), indexJsExportAll);
}

module.exports = generateGraphqlCode;

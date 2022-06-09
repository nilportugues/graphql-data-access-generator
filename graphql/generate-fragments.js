const fs = require("fs-extra");
const { importSchema } = require("graphql-import");
const { parse } = require("graphql");
const { buildASTSchema } = require("graphql/utilities");
const json = require("json-keys-sort");

class GenerateFragments {
  config;
  fragmentsExtensionConfig;
  projectName;
  project;

  processFragments(schemaPath, outputPath, fileName) {
    const extension = "js";

    const schema = schemaPath;

    const schemaContents = importSchema(schema);
    const fragments = this.makeFragments(schemaContents, extension);

    fs.mkdirpSync(outputPath);
    fs.writeFileSync(outputPath + "/" + fileName, fragments, { flag: "w" });
  }

  indentedLine(level) {
    let line = "\n";
    for (let i = 0; i < level; i++) {
      line += "  ";
    }
    return line;
  }

  fragmentType = {
    DEFAULT: "",
    NO_RELATIONS: "NoNesting",
    DEEP: "DeepNesting",
  };

  makeFragments(schemaContents, generator) {
    const document = parse(schemaContents, { noLocation: true });
    const ast = buildASTSchema(document);

    const typeNames = Object.keys(ast.getTypeMap())
      .filter((typeName) => ast.getType(typeName) !== undefined)
      .filter(
        (typeName) =>
          ast.getType(typeName).constructor.name === "GraphQLObjectType"
      )
      .filter((typeName) => !typeName.startsWith("__"))
      .filter((typeName) => typeName !== ast.getQueryType().name)
      .filter((typeName) =>
        ast.getMutationType() ? typeName !== ast.getMutationType().name : true
      )
      .filter((typeName) =>
        ast.getSubscriptionType()
          ? typeName !== ast.getSubscriptionType().name
          : true
      )
      .sort((a, b) =>
        ast.getType(a).constructor.name < ast.getType(b).constructor.name
          ? -1
          : 1
      );

    // console.log(typeNames)

    const standardFragments = typeNames
      .map((typeName) => {
        const type = ast.getType(typeName);
        const { name } = type;

        const fields = this.generateFragments(type, ast);
        if (fields.length === 0) return null;
        return {
          name,
          fragment: `fragment ${name} on ${name} {
  ${fields.join(this.indentedLine(1))}
}
`,
        };
      })
      .filter((frag) => frag != null);

    const noRelationsFragments = typeNames
      .map((typeName) => {
        const type = ast.getType(typeName);
        const { name } = type;

        const fields = this.generateFragments(
          type,
          ast,
          this.fragmentType.NO_RELATIONS
        );
        if (fields.length === 0) return null;

        return {
          name,
          fragment: `fragment ${name}${
            this.fragmentType.NO_RELATIONS
          } on ${name} {
  ${fields.join(this.indentedLine(1))}
}
`,
        };
      })
      .filter((frag) => frag != null);
    const deepFragments = typeNames
      .map((typeName) => {
        const type = ast.getType(typeName);
        const { name } = type;

        const fields = this.generateFragments(
          type,
          ast,
          this.fragmentType.DEEP
        );
        if (fields.length === 0) return null;
        return {
          name,
          fragment: `fragment ${name}${this.fragmentType.DEEP} on ${name} {
  ${fields.join(this.indentedLine(1))}
}
`,
        };
      })
      .filter((frag) => frag != null);

    if (generator === "js") {
      const lines = {};
      const exported = {};

      standardFragments
        .filter(({ name }) => !name.endsWith("_functions"))
        .forEach(({ name, fragment }) => {
          lines[name.toLowerCase()] = `const __${name} = \`${fragment}\``;
          exported[name] = [`\${__${name}}`];
        });

      noRelationsFragments
        .filter(({ name }) => !name.endsWith("_functions"))
        .forEach(({ name, fragment }) => {
          lines[
            `${name}${this.fragmentType.NO_RELATIONS}`.toLowerCase()
          ] = `const __${name}${this.fragmentType.NO_RELATIONS} = \`${fragment}\``;
          exported[`${name}${this.fragmentType.NO_RELATIONS}`] = [
            `\${__${name}${this.fragmentType.NO_RELATIONS}}`,
          ];
        });

      deepFragments
        .filter(({ name }) => !name.endsWith("_functions"))
        .forEach(({ name, fragment }) => {
          lines[
            `${name}${this.fragmentType.DEEP}`.toLowerCase()
          ] = `const __${name}${this.fragmentType.DEEP} = \`${fragment}\``;
          exported[`${name}${this.fragmentType.DEEP}`] = [
            `\${__${name}${this.fragmentType.DEEP}}`,
          ];
        });

      const sortedLines = json.sort(lines, true);
      const sortedExported = json.sort(exported, true);

      //Now build the export version... for each entry, we need to track all the inner fragments.
      const exportKeys = Object.keys(sortedExported);
      for (let i = 0; i < exportKeys.length; i++) {
        const rawKey = exportKeys[i];
        const key = exportKeys[i].toLowerCase();

        const results = this.__getFragmentNames(key, lines[key], lines);
        sortedExported[rawKey].push(...results);
      }

      return `
${Object.values(sortedLines).join("\n\n")}

${Object.keys(sortedExported)
  .map((k) => {
    return `export const ${k} = \`
${[...new Set(sortedExported[k])].join("\n")}
\``;
  })
  .join("\n\n")}

`.trim();
    }
  }

  __getFragmentNames(key, codeBlock, lines) {
    let results = [];
    const newLines = JSON.parse(JSON.stringify(lines));
    delete newLines[key];

    if (codeBlock && codeBlock.includes("...")) {
      let withDependencies = codeBlock
        .split("\n")
        .filter((r) => r.includes("..."))
        .map((r) => r.replace("...", "").trim())
        .filter((v) => v.toLowerCase() != key.toLowerCase());
      withDependencies = [...new Set(withDependencies)];

      //now, recursively we want to find the '...' entries in these fragments too.
      withDependencies.forEach((depName) => {
        results.push(
          ...this.__getFragmentNames(
            depName.toLowerCase(),
            lines[depName.toLowerCase()],
            newLines
          )
        );
      });

      results.push(...withDependencies.map((r) => `\${__${r}}`));
    }

    return [...new Set(results)];
  }

  generateFragments(type, ast, fragmentType = this.fragmentType.DEFAULT) {
    const fields = type.getFields();
    const fragmentFields = Object.keys(fields)
      .filter((field) => !field.endsWith("_func"))
      .map((field) => {
        return this.printField(field, fields[field], ast, fragmentType);
      })
      // Some fields should not be printed, ie. fields with relations.
      // Remove those from the output by returning null from printField.
      .filter((field) => field != null);
    return fragmentFields;
  }
  printField(fieldName, field, ast, fragmentType, indent = 1) {
    let constructorName =
      field.type.constructor.name && field.type.constructor.name;
    if (constructorName === "Object")
      constructorName =
        (field.type.name &&
          ast.getType(field.type.name.value).constructor.name) ||
        null;

    if (constructorName === "GraphQLList") {
      field =
        (field.astNode.type.type.type && field.astNode.type.type.type) ||
        (field.astNode.type.type && field.astNode.type.type) ||
        null;

      if (field === null) {
        throw new Error(`Schema malformed - list`);
      }
      constructorName = ast.getType(field.name.value).constructor.name;
    }

    if (constructorName === "GraphQLNonNull" || field.kind === "NonNullType") {
      field = (field.astNode.type && field.astNode.type) || field.type;
      constructorName =
        (field.type.name &&
          ast.getType(field.type.name.value).constructor.name) ||
        null;
      if (constructorName === null) {
        field = (field.type && field.type) || null;
        constructorName =
          (field.type.name &&
            ast.getType(field.type.name.value).constructor.name) ||
          null;
      }
    }

    if (
      constructorName === "GraphQLScalarType" ||
      constructorName === "GraphQLEnumType"
    ) {
      return fieldName;
    }

    if (constructorName === "GraphQLObjectType") {
      let typeName = null;
      
      typeName =
        (field.name && field.name.value) ||
        (field.type.name.value && field.type.name.value) ||
        field.type.name;

      return (
        fieldName +
        " {" +
        this.indentedLine(indent + 1) +
        "..." +
        `${
          (fragmentType === this.fragmentType.DEEP &&
            typeName + this.fragmentType.DEEP) ||
          (fragmentType === this.fragmentType.DEFAULT &&
            typeName + this.fragmentType.NO_RELATIONS) ||
          typeName + this.fragmentType.DEFAULT
        }` +
        this.indentedLine(indent) +
        "}"
      );
    }

    return null;
  }
}

module.exports = GenerateFragments;

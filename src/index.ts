#!/usr/bin/env node
import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";
import { generateController } from "./controller";
import { generateFunctions } from "./function";
import { generateTest } from "./test";
import { generateModel } from "./model";
import { generateRepository } from "./repository";
import { generateSdkgen } from "./sdkgen";
import { existsSync, unlinkSync } from "fs";
import { firstWordToUppercase, removeLineExistsInFile } from "./helpers";

enum Database {
  typeorm,
  knex,
  puresql,
}

const optionDefinitions = [
  { alias: "c", name: "component", type: String },
  { alias: "f", multiple: true, name: "functions", type: String },
  { alias: "m", multiple: true, name: "model", type: String },
  { alias: "d", defaultValue: Database.typeorm, name: "database", type: String },
  { alias: "r", name: "repository", type: Boolean },
  { alias: "t", name: "test", type: Boolean },
  { alias: "h", name: "help", type: Boolean },
];

const options: {
  component?: string;
  functions?: string[];
  model?: string[];
  database?: Database;
  repository?: boolean;
  test?: boolean;
  help?: boolean;
  _unknown?: string[];
} = commandLineArgs(optionDefinitions, {
  stopAtFirstUnknown: true,
});

if (options.help) {
  const sections = [
    {
      content: "Generates codes to make your life easier.",
      header: "Cubos CLI",
    },
    {
      header: "Options",
      optionList: [
        {
          alias: "c",
          description: "Component you want to create.",
          name: "component",
          type: String,
        },
        {
          alias: "f",
          description: "Provide functions you want to create.",
          name: "functions",
          type: String,
        },
        {
          alias: "m",
          description: "Model you want to create.",
          name: "model",
          type: String,
        },
        {
          alias: "d",
          description: "SQL Database that you want to use.",
          name: "database",
          type: String,
        },
        {
          alias: "r",
          description: "Provide if you want create repository file.",
          name: "repository",
          type: Boolean,
        },
        {
          alias: "t",
          description: "Provide if you want create tests.",
          name: "test",
          type: Boolean,
        },
        {
          alias: "h",
          description: "Print the guide to use this CLI.",
          name: "help",
          type: Boolean,
        },
      ],
    },
    {
      content: [
        {
          desc: "1. Create a controller.",
          example: "$ npx cubos-cli -c ted",
        },
        {
          desc: "2. Create a controller with tests.",
          example: "$ npx cubos-cli -c ted -t",
        },
        {
          desc: "3. Create a controller with the function addSegure and tests.",
          example: "$ npx cubos-cli -c segure -f addSegure#name:string,info:string -t",
        },
        {
          desc: "4. Create a controller with functions and create a model",
          example:
            "npx cubos-cli -c segure -f addSegure#name:string,info:string updateSegure#id:string,name:string,info:string -m name:string info:string",
        },
      ],
      header: "Examples",
    },
    {
      content: "Project home: {underline https://github.com/leleofg/cubos-cli}",
    },
  ];

  console.log(commandLineUsage(sections));
  throw new Error("");
}

if (!options.component) {
  throw new Error("You need to provide the component.\n\ncubos-cli -h for more information");
}

if (options.database !== Database.typeorm) {
  throw new Error("For now works only with typeorm.");
}

try {
  if (generateController(options.component)) {
    generateFunctions(options.component, options.functions);
  }

  generateSdkgen(options.component, options.functions);

  if (options.model) {
    generateModel(options.component, options.model);
  }

  if (options.test) {
    generateTest(options.component, options.functions);
  }

  if (options.repository) {
    if (!options.model) {
      throw new Error("You need to provide model when use repository.");
    }

    generateRepository(options.component);
  }
} catch (error) {
  // Controller
  unlinkSync(`src/controllers/${options.component.toLocaleLowerCase()}.ts`);
  removeLineExistsInFile("src/controllers/index.ts", options.component.toLocaleLowerCase());

  // Sdkgen
  if (existsSync(`src/schemas/${options.component.toLocaleLowerCase()}.sdkgen`)) {
    unlinkSync(`src/schemas/${options.component.toLocaleLowerCase()}.sdkgen`);
    removeLineExistsInFile("src/api.sdkgen", options.component.toLocaleLowerCase());
  }

  // Model
  if (existsSync(`src/models/${firstWordToUppercase(options.component)}.ts`)) {
    unlinkSync(`src/models/${firstWordToUppercase(options.component)}.ts`);
    removeLineExistsInFile("src/models/index.ts", firstWordToUppercase(options.component));
  }

  // Tests
  if (existsSync(`tests/${options.component.toLocaleLowerCase()}.test.ts`)) {
    unlinkSync(`tests/${options.component.toLocaleLowerCase()}.test.ts`);
  }

  // Repository
  if (existsSync(`src/repositories/${firstWordToUppercase(options.component)}Repository.ts`)) {
    unlinkSync(`src/repositories/${firstWordToUppercase(options.component)}Repository.ts`);
    removeLineExistsInFile("src/models/index.ts", `${firstWordToUppercase(options.component)}Repository`);
  }

  console.log(error.message);
  console.log("cubos-cli -h for more information");
}

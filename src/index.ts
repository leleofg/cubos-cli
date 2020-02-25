#!/usr/bin/env node
import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";
import { generateController } from "./controller";
import { generateFunctions } from "./function";
import { generateSdkgen } from "./sdkgen";
import { generateTest } from "./test";
import { generateModel } from "./model";
import { generateRepository } from "./repository";

const optionDefinitions = [
  { alias: "c", name: "component", type: String },
  { alias: "f", multiple: true, name: "functions", type: String },
  { alias: "s", name: "sdkgen", type: Boolean },
  { alias: "m", multiple: true, name: "model", type: String },
  { alias: "r", name: "repository", type: Boolean },
  { alias: "t", name: "test", type: Boolean },
  { alias: "h", name: "help", type: Boolean },
];

const options: {
  component?: string;
  functions?: string[];
  sdkgen?: boolean;
  model?: string[];
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
          alias: "s",
          description: "Provide if you want create sdkgen functions.",
          name: "sdkgen",
          type: Boolean,
        },
        {
          alias: "m",
          description: "Model you want to create.",
          name: "model",
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
          desc: "1. Create a controller. ",
          example: "$ npx cubos-cli -c ted",
        },
      ],
      header: "Examples",
    },
    {
      content: "Project home: {underline https://github.com/leleofg/cubos-cli}",
    },
  ];

  console.log(commandLineUsage(sections));
  throw new Error("Help");
}

if (!options.component) {
  throw new Error("You need to provide the component.\n\ncubos-cli -h for more information");
}

generateController(options.component);

if (options.functions) {
  generateFunctions(options.component, options.functions);
}

if (options.sdkgen) {
  generateSdkgen(options.component, options.functions);
}

if (options.test) {
  generateTest(options.component, options.functions);
}

if (options.model) {
  generateModel(options.component, options.model);
}

if (options.repository) {
  generateRepository(options.component);
}

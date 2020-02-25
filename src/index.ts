import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";
import { generateController } from "./controller";
import { generateFunctions } from "./function";
import { generateSdkgen } from "./sdkgen";
import { generateTest } from "./test";
import { generateModel } from "./model";
import { generateRepository } from "./repository";

const optionDefinitions = [
  { name: "component", alias: "c", type: String },
  { name: "functions", alias: "f", type: String, multiple: true },
  { name: "sdkgen", alias: "s", type: Boolean },
  { name: "model", alias: "m", type: String, multiple: true },
  { name: "repository", alias: "r", type: Boolean },
  { name: "test", alias: "t", type: Boolean },
  { name: "help", alias: "h", type: Boolean }
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
  stopAtFirstUnknown: true
});

if (options.help) {
  const sections = [
    {
      header: "Cubos CLI",
      content: "Generates codes to make your life easier."
    },
    {
      header: "Options",
      optionList: [
        {
          name: "controller",
          description: "Controller you want to create.",
          alias: "c",
          type: String
        },
        {
          name: "functions",
          description: "Provide functions you want to create.",
          alias: "f",
          type: String
        },
        {
          name: "sdkgen",
          description: "Provide if you want create sdkgen functions.",
          alias: "s",
          type: Boolean
        },
        {
          name: "model",
          description: "Model you want to create.",
          alias: "m",
          type: String
        },
        {
          name: "repository",
          description: "Provide if you want create repository file.",
          alias: "r",
          type: Boolean
        },
        {
          name: "test",
          description: "Provide if you want create tests.",
          alias: "t",
          type: Boolean
        },
        {
          name: "help",
          description: "Print the guide to use this CLI.",
          alias: "h",
          type: Boolean
        }
      ]
    },
    {
      header: "Examples",
      content: [
        {
          desc: "1. Create a controller. ",
          example: "$ npx cubos-cli -c ted"
        }
      ]
    },
    {
      content: "Project home: {underline https://github.com/leleofg/cubos-cli}"
    }
  ];
  console.log(commandLineUsage(sections));
  process.exit(0);
}

if (!options.component) {
  console.log("You need to provide the component");
  process.exit(0);
}

generateController(options.component);
generateFunctions(options.component, options.functions);

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

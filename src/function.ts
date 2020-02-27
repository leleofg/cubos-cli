/* eslint-disable @typescript-eslint/require-array-sort-compare */
import { appendFileSync } from "fs";
import { firstWordToUppercase } from "./helpers";

export function generateFunctions(component: string, functions?: string[]) {
  appendFileSync(
    `src/controllers/${component}.ts`,
    functions && functions.length
      ? functions
          .map(fun => {
            if (fun.split("#").length > 2) {
              throw new Error("format functions wrong.");
            }

            const [nameFunction, argsFunction] = fun.split("#");

            if (argsFunction) {
              const args = argsFunction.split(",");

              if (args[args.length - 1] === "") {
                throw new Error("format functions wrong.");
              }

              if (args.length > 1) {
                let argsConcat = "";
                const argsNames = args
                  .map(arg => {
                    const [nameArg] = arg.split(":");

                    argsConcat += `\${${nameArg}} `;

                    return nameArg;
                  })
                  .sort();

                return `
api.fn.${nameFunction} = async (ctx, { ${argsNames.join(", ")} }) => {
  return \`${argsConcat}\`;
};\n`;
              }

              const [nameArg] = args[0].split(":");

              return `
api.fn.${nameFunction} = async (ctx, { ${nameArg} }) => {
  return \`\${${nameArg}}\`;
};\n`;
            }

            return `
api.fn.${nameFunction} = async ctx => {
  return "";
};\n`;
          })
          .join("")
      : `
api.fn.get${firstWordToUppercase(component)} = async ctx => {
  return "";
};\n`,
  );
}

/* eslint-disable @typescript-eslint/require-array-sort-compare */
import { appendFileSync } from "fs";
import { firstWordToUppercase } from "./helpers";

export function generateFunctions(component: string, functions?: string[]) {
  appendFileSync(
    `src/controllers/${component}.ts`,
    functions && functions.length
      ? functions
          .map(fun => {
            const [nameFunction, argsFunction] = fun.split("#");

            if (argsFunction) {
              const args = argsFunction.split(",");

              if (args.length > 1) {
                const argsNames = args
                  .map(arg => {
                    const [nameArg] = arg.split(":");

                    return nameArg;
                  })
                  .sort();

                return `
api.fn.${nameFunction} = async (ctx, { ${argsNames.join(", ")} }) => {
  return \`\${${argsNames.join(" - ")}}\`;
};\n`;
              }

              const [nameArg] = args[0].split(":");

              return `
api.fn.${nameFunction} = async (ctx, { ${nameArg} }) => {
  return \`\${${nameArg}}\`;
};\n`;
            }

            return "";
          })
          .join("")
      : `\n
api.fn.get${firstWordToUppercase(component)} = async ctx => {
  return "";
};`,
  );
}

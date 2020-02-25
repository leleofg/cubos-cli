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
                  .join(", ");

                return `\n
api.fn.${nameFunction} = async (ctx, { ${argsNames} }) => {
    return "test";
};`;
              }

              const [nameArg] = args[0].split(":");

              return `\n
api.fn.${nameFunction} = async (ctx, { ${nameArg} }) => {
    return "test";
};`;
            }
          })
          .join("")
      : `\n
api.fn.get${firstWordToUppercase(component)} = async ctx => {
  return "test";
};`
  );
}

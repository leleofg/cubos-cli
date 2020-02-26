import { appendFileSync, writeFileSync } from "fs";
import { checkLineExistsInFile, firstWordToUppercase, primitivesSdkgen } from "./helpers";

export function generateSdkgen(component: string, functions?: string[]) {
  if (checkLineExistsInFile("src/api.sdkgen", component)) {
    return;
  }

  writeFileSync(
    `src/schemas/${component}.sdkgen`,
    functions && functions.length
      ? functions
          .map(fun => {
            const [nameFunction, argsFunction] = fun.split("#");

            if (argsFunction) {
              const args = argsFunction.split(",");

              if (args.length > 1) {
                const argsAndTypes = args
                  .map(arg => {
                    const [nameArg, typeArg] = arg.split(":");

                    if (!primitivesSdkgen.includes(typeArg)) {
                      throw new Error("Type primitive invalid for sdkgen");
                    }

                    return `${nameArg}: ${typeArg}`;
                  })
                  .join(", ");

                return `fn ${nameFunction}(${argsAndTypes}): string\n`;
              }

              const [nameArg, typeArg] = args[0].split(":");

              if (!primitivesSdkgen.includes(typeArg)) {
                throw new Error("Type primitive invalid for sdkgen");
              }

              return `fn ${nameFunction}(${nameArg}: ${typeArg}): string\n`;
            }

            return `fn ${nameFunction}(): string\n`;
          })
          .join("")
      : `fn get${firstWordToUppercase(component)}(): string\n`,
  );
  appendFileSync("src/api.sdkgen", `import "./schemas/${component}"\n`);
}

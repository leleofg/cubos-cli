import { appendFileSync, writeFileSync } from "fs";
import { firstWordToUppercase } from "./helpers";

export function generateSdkgen(controller: string, functions?: string[]) {
  writeFileSync(
    `src/schemas/${controller}.sdkgen`,
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
                    // TODO: need validate typeArg to primitive types sdkgen

                    return `${nameArg}: ${typeArg}`;
                  })
                  .join(", ");

                return `fn ${nameFunction}(${argsAndTypes}): string\n`;
              }

              const [nameArg, typeArg] = args[0].split(":");

              return `fn ${nameFunction}(${nameArg}: ${typeArg}): string\n`;
            }

            return "";
          })
          .join("")
      : `fn get${firstWordToUppercase(controller)}(): string\n`,
  );
  appendFileSync("src/api.sdkgen", `import "./schemas/${controller}"`);
}

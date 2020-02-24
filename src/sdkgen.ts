import { writeFileSync, appendFileSync } from "fs";
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

              return `fn ${nameFunction}(): string\n`;
            }
          })
          .join("")
      : `fn get${firstWordToUppercase(controller)}(): string\n`
  );
  appendFileSync("src/api.sdkgen", `import "./schemas/${controller}"`);
}

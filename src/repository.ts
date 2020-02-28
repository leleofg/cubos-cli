import { appendFileSync, readFileSync, writeFileSync } from "fs";
import { checkLineExistsInFile, firstWordToUppercase, replaceRepositoriesDB } from "./helpers";

export function generateRepository(component: string) {
  if (checkLineExistsInFile("src/repositories/index.ts", component)) {
    return;
  }

  const scriptRepository = `import { EntityRepository, Repository } from "typeorm";
import { ${firstWordToUppercase(component)} } from "../models";

@EntityRepository(${firstWordToUppercase(component)})
export class ${firstWordToUppercase(component)}Repository extends Repository<${firstWordToUppercase(component)}> {}
`;

  writeFileSync(`src/repositories/${firstWordToUppercase(component)}Repository.ts`, scriptRepository);
  appendFileSync("src/repositories/index.ts", `export * from "./${firstWordToUppercase(component)}Repository";\n`);

  // Api
  const fileAPI = readFileSync("src/api.ts")
    .toString()
    .split("\n");

  replaceRepositoriesDB(component, fileAPI, "src/api.ts");

  // Server
  const fileServer = readFileSync("src/server.ts")
    .toString()
    .split("\n");

  replaceRepositoriesDB(component, fileServer, "src/server.ts");

  // Test
  const fileHelpersTest = readFileSync("tests/helpers.ts")
    .toString()
    .split("\n");

  replaceRepositoriesDB(component, fileHelpersTest, "tests/helpers.ts");
}

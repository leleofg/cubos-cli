import { appendFileSync, readFileSync, writeFileSync } from "fs";
import { firstWordToUppercase, replaceRepositoriesDB } from "./helpers";

export function generateRepository(component: string) {
  appendFileSync("src/repositories/index.ts", `export * from "./${firstWordToUppercase(component)}Repository";\n`);

  const scriptRepository = `import { EntityRepository, Repository } from "typeorm";
import { ${firstWordToUppercase(component)} } from "../models";

@EntityRepository(${firstWordToUppercase(component)})
export class ${firstWordToUppercase(component)}Repository extends Repository<${firstWordToUppercase(component)}> {}
`;

  writeFileSync(`src/repositories/${firstWordToUppercase(component)}Repository.ts`, scriptRepository);

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
}

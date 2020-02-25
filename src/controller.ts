import { appendFileSync, writeFileSync } from "fs";
import { checkLineExistsInFile } from "./helpers";

export function generateController(component: string) {
  if (checkLineExistsInFile("src/controllers/index.ts", component)) {
    return;
  }

  writeFileSync(`src/controllers/${component.toLocaleLowerCase()}.ts`, 'import { api } from "../api";\n');
  appendFileSync("src/controllers/index.ts", `import "./${component.toLocaleLowerCase()}";\n`);
}

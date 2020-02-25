import { appendFileSync, writeFileSync } from "fs";

export function generateController(component: string) {
  writeFileSync(`src/controllers/${component.toLocaleLowerCase()}.ts`, 'import { api } from "../api";\n');

  appendFileSync("src/controllers/index.ts", `import "./${component.toLocaleLowerCase()}";\n`);
}

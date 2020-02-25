import { writeFileSync, appendFileSync } from "fs";

export function generateController(component: string) {
  writeFileSync(
    `src/controllers/${component.toLocaleLowerCase()}.ts`,
    'import { api } from "../api";'
  );

  appendFileSync(
    "src/controllers/index.ts",
    `import "./${component.toLocaleLowerCase()}";\n`
  );
}

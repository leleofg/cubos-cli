import { writeFileSync, appendFileSync } from "fs";

export function generateController(controller: string) {
  writeFileSync(
    `src/controllers/${controller.toLocaleLowerCase()}.ts`,
    'import { api } from "../api";'
  );

  appendFileSync(
    "src/controllers/index.ts",
    `import "./${controller.toLocaleLowerCase()}";\n`
  );
}

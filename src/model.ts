import { writeFileSync, appendFileSync } from "fs";
import { firstWordToUppercase } from "./helpers";
import pluralize from "pluralize";

export function generateModel(controller: string, fields?: string[]) {
  appendFileSync(
    "src/models/index.ts",
    `export * from "./${firstWordToUppercase(controller)}";\n`
  );

  const scriptModel = `import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "${pluralize(controller)}" })
export class ${firstWordToUppercase(controller)} {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  ${
    fields && fields.length
      ? fields
          .map(field => {
            const [nameField, typeField] = field.split(":");
            return `@Column()
  ${nameField}!: ${typeField};
`;
          })
          .join("\n  ")
      : ""
  }}
`;

  writeFileSync(
    `src/models/${firstWordToUppercase(controller)}.ts`,
    scriptModel
  );
}

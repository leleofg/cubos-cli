import { appendFileSync, writeFileSync } from "fs";
import { firstWordToUppercase } from "./helpers";
import pluralize from "pluralize";

export function generateModel(component: string, fields?: string[]) {
  appendFileSync("src/models/index.ts", `export * from "./${firstWordToUppercase(component)}";\n`);

  const scriptModel = `import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "${pluralize(component)}" })
export class ${firstWordToUppercase(component)} {
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

  writeFileSync(`src/models/${firstWordToUppercase(component)}.ts`, scriptModel);
}

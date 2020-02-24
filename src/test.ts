import { writeFileSync } from "fs";
import { firstWordToUppercase } from "./helpers";

export function generateTest(controller: string, functions?: string[]) {
  const scriptTest = `import { apiTestWrapper } from "@sdkgen/node-runtime";
import { api, Context } from "../src/api";
import "../src/controllers";
import { makeCtx } from "./helpers";

const { fn } = apiTestWrapper(api);

describe("${firstWordToUppercase(controller)}", () => {
  let ctx: Context;

  beforeAll(() => {
    ctx = makeCtx({});
  });

  ${
    functions && functions.length
      ? functions
          .map(fun => {
            const [nameFunction] = fun.split("#");

            return `test("${nameFunction}: should return a string", async () => {
    const res = await fn.${nameFunction}(ctx, {});

    expect(res).toBe("test");
  });
`;
          })
          .join("\n  ")
      : `test("get${firstWordToUppercase(controller)}", async () => {
    const res = await fn.get${firstWordToUppercase(controller)}(ctx, {});

    expect(res).toBe("test");
  });
`
  }});
`;

  writeFileSync(`tests/${controller}.test.ts`, scriptTest);
}

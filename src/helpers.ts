import { writeFileSync } from "fs";

export function firstWordToUppercase(word: string) {
  return `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`;
}

export function strcmp(wordA: string, wordB: string) {
  if (wordA.toString() < wordB.toString()) {
    return false;
  }

  return true;
}

function checkObject(file: string[], compare: string, index: number): number {
  const current = file[index].split(":");
  const currentKey = current[0].trim();

  if (!strcmp(currentKey, compare)) {
    return checkObject(file, compare, index + 1);
  }

  return index;
}

export function replaceRepositoriesDB(component: string, file: string[], path: string) {
  let numberLine = 0;
  let lineToReplaceRepositories = "";
  let lineDB = 0;
  let lineToReplaceDB = "";

  for (const [index, line] of file.entries()) {
    if (line.indexOf("./repositories") > 0) {
      numberLine = index;
      const newLine = line.split("{");
      const newLine2 = newLine[1].split("}");

      let arrayOfRepositories = newLine2[0].split(",");

      arrayOfRepositories = arrayOfRepositories.map(a => a.trim());

      arrayOfRepositories.push(`${firstWordToUppercase(component)}Repository`);

      // eslint-disable-next-line @typescript-eslint/require-array-sort-compare
      arrayOfRepositories.sort();
      const newRepositories = arrayOfRepositories.join(", ");

      lineToReplaceRepositories = `import { ${newRepositories} } from "./repositories";`;
    }

    if (line.indexOf("db: {") > 0) {
      lineDB = checkObject(file, component.toLowerCase(), index + 1);
      if (path === "src/api.ts") {
        lineToReplaceDB = `    ${component.toLowerCase()}: ${firstWordToUppercase(component)}Repository;`;
      } else {
        lineToReplaceDB = `        ${component.toLowerCase()}: connection.getCustomRepository(${firstWordToUppercase(
          component,
        )}Repository),`;
      }
    }
  }

  file.splice(numberLine, 1, lineToReplaceRepositories);
  file.splice(lineDB, 0, lineToReplaceDB);
  writeFileSync(path, file.join("\n"));
}

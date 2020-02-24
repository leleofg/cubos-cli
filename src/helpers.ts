export function firstWordToUppercase(word: string) {
  return `${word.substring(0, 1).toUpperCase()}${word.substring(1)}`;
}

export function strcmp(wordA: string, wordB: string) {
  if (wordA.toString() < wordB.toString()) {
    return false;
  }

  return true;
}

export interface PrimitiveTypes {}

// export function checkObject(file: File, compare, index) {
//   const current = file[index].split(":");
//   const currentKey = current[0].trim();

//   if (!strcmp(currentKey, compare)) {
//     return checkObject(file, compare, Number(index) + 1);
//   }

//   return index;
// }

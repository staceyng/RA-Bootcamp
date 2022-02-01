let text = "Mr. (a, b) has a blue house";
let position = text.indexOf("(");
let position2 = text.indexOf(")");
let params = text.slice(4 + 1, 9);
let p = params.split(",").map((i) => i.trim());
console.log(position, position2);
console.log(params);
console.log(p);

import { readFile } from "fs";
import path from "path";
import { readdirSync, statSync } from "fs";

let sortBy, fileName, directory;
const output = [];

const handleFileRead = (error, content) => {
  // Split the content of our file by lines
  const lines = content.split("\n");

  // For each line, log the line number and the content of that line
  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].startsWith("//")) {
      const comment = lines[i].substring(2).trim();
      console.log(`Line ${i + 1}: "${comment}"`);
    }
  }
};

const sortFunctionNames = () => {
  if (sortBy === "name") {
    output.sort();
  }
  output.forEach((line) => console.log(line));
};

const handleFileReadParams = (error, content) => {
  // Split the content of our file by lines
  const lines = content.split("\n");
  ``;

  // For each line, log the line number and the content of that line
  for (let i = 0; i < lines.length; i += 1) {
    const words = lines[i].split(" ");
    if (
      words[0] === "const" &&
      words[2] === "=" &&
      words[5] === "=>" &&
      words[6] === "{"
    ) {
      const functionName = words[1];
      const openParIndex = lines[i].indexOf("(");
      const closeParIndex = lines[i].indexOf(")");
      const params = lines[i].substring(openParIndex + 1, closeParIndex);
      output.push(`${words[1]}: ${params}`);
    }
  }

  if (sortBy !== "") sortFunctionNames();
};

export function showComments(dir, name, sort) {
  directory = dir;
  fileName = name;
  sortBy = sort;
  const files = recFindByName(directory, "js");
  files.forEach((file) => {
    readFile(file, "utf8", handleFileRead);
  });
}

export function showParams(dir, name, sort) {
  directory = dir;
  fileName = name;
  sortBy = sort;
  const files = recFindByName(directory, "js");
  files.forEach((file) => {
    readFile(file, "utf8", handleFileReadParams);
  });
}

function recFindByName(base, ext, files, result) {
  files = files || readdirSync(base);
  result = result || [];

  files.forEach(function (file) {
    var newbase = path.join(base, file);
    if (statSync(newbase).isDirectory()) {
      result = recFindByName(newbase, ext, readdirSync(newbase), result);
    } else {
      if (file === fileName) {
        result.push(newbase);
      }
    }
  });
  return result;
}

import { readFile } from "fs";
let sortBy;

const handleFileReadBase = (error, content) => {
  if (error) {
    console.log("readFile error: ", error);
    return;
  }

  const lines = content.split("\n");
  const comments = [];

  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].startsWith("//")) {
      const str = `Line [${i + 1}]: "${lines[i].substring(2).trim()}"`;
      comments.push(str);
    }
  }

  if (sortBy === "alphabet") {
    comments.sort();
  }
  console.log(comments);

  for (let i = 0; i < comments.length; i += 1) {
    console.log(comments[i]);
  }
};

const handleFileReadComfortable = (error, content) => {
  if (error) {
    console.log("readFile error: ", error);
    return;
  }

  const lines = content.split("\n");
  // console.log(lines);
  const functionStrings = [];

  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].startsWith("const")) {
      // extract function name and params
      const res = extractFunctionParams(lines[i]);
      functionStrings.push(res);
      // console.log(`${res.functionName}: ${res.params.join(", ")}`);
    }
  }

  if (sortBy === "alphabet") {
    sortByFunctionName(functionStrings);
  }

  for (let i = 0; i < functionStrings.length; i += 1) {
    console.log(
      `${functionStrings[i].functionName}: ${functionStrings[i].params.join(
        ", "
      )}`
    );
  }
};

const extractFunctionParams = (s) => {
  const w = s.split(" ");
  const functionName = w[1];
  const p = s.slice(s.indexOf("(") + 1, s.indexOf(")"));
  const params = p.split(",").map((i) => i.trim());
  return { functionName, params };
};

const sortByFunctionName = (arr) => {
  arr.sort((a, b) => a.functionName.localeCompare(b.functionName));
  console.log(arr);
};

export const showComments = (filename, sort) => {
  sortBy = sort;
  readFile(filename, "utf8", handleFileReadBase);
};

export const showFunctionParams = (filename, sort) => {
  sortBy = sort;
  readFile(filename, "utf-8", handleFileReadComfortable);

  // for (let i = 0; i < resArr.length; i += 1) {
  //   console.log(`${resArr[i].functionName}: (${resArr[i].a}, ${resArr[i].b})`);
  // }
};

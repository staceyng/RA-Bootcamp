// Import readFile function from global fs module. fs stands for file system.
import { readFile } from "fs";

console.log("done importing from fs");

// Define callback function to run after retrieving file contents in readFile
const handleFileRead = (error, content) => {
  if (error) {
    console.log("read error:", error);
    return;
  }

  console.log("running inside of handleFileRead");
  const lines = content.split("\n"); // array?
  console.log(lines);

  for (let i = 0; i < lines.length; i += 1) {
    // lines[i] type string
    console.log(`[${i + 1}]: ${lines[i]}`);
  }

  // console.log("content", content);
};

console.log("about to call readFile");

// 2nd param 'utf8' specifies the file encoding.
// Read more about UTF8 here: https://en.wikipedia.org/wiki/UTF-8
readFile("blank.txt", "utf8", handleFileRead);

console.log("done calling readFile");

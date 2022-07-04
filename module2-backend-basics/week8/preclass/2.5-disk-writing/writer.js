import { writeFile } from "fs";

// const content = "Some content!";
let content = `Printing 10 numbers: \n`;
for (let i = 0; i < 10; i += 1) {
  // The \n character inserts a newline at that position of the string.
  console.log("Adding a random number ...");
  content += `Random number: ${i}: ${Math.random()}\n`;
}

// We often abbreviate "error" to "err" for concision.
const handleFileWrite = (err) => {
  if (err) {
    console.log(err);
    return;
  }
  // If no error, file written successfully
  console.log("success!");
};

writeFile("test.txt", content, handleFileWrite);

import { readFile, writeFile } from "fs";

const filename = "script.js";

/**
 * Process content and write new content back to original file
 * @param readErr - Reading error if any
 * @param content - Original file content
 * @returns undefined
 */
const handleFileRead = (readErr, content) => {
  // Log original file content
  console.log(content);

  // Catch reading error if any
  if (readErr) {
    console.log("reading error", readErr);
  }

  const lines = content.split("\n");
  let lineToReplace = "";

  // find line where comment starts
  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].startsWith("//")) {
      // change comment to /*
      lineToReplace += lines[i].replace("//", "/*");
      lineToReplace += " */";
      lineToReplace += "\n";
    } else {
      lineToReplace += lines[i];
      lineToReplace += "\n";
    }
  }

  console.log(lineToReplace);

  // Write processed content back to the file, replacing old content
  writeFile(filename, lineToReplace, (writeErr) => {
    // Catch writing error if any
    if (writeErr) {
      console.log("error writing", lineToReplace, writeErr);
      return;
    }
    console.log("success!");
  });
};

readFile(filename, "utf-8", handleFileRead);

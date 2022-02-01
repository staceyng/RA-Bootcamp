// 1. read template.html, write to a new file
// 2. add command line naming etc

import { readFile, writeFile, copyFileSync, readdirSync } from "fs";

const filename = "template.html";
const newFile = process.argv[2];
const path = process.argv[3]; // path to image folder

const copyImages = (filepath) => {
  // 1. read files in src folder
  const filenames = readdirSync("." + filepath);
  console.log(filenames);
  // 2. copy file to dest
  filenames.forEach((file) => {
    // console.log(file);
    copyFileSync("." + path + "/" + file, file);
  });

  return filenames;
};

const addImages = (imageList) => {
  // where n is the number of image tags to add
  let imageString = "";
  for (let i = 0; i < imageList.length; i += 1) {
    imageString += `    <img src="${imageList[i]}" alt="image-${i + 1}">\n`;
  }
  return imageString;
};

/**
 * Process content and write new content back to original file
 * @param readErr - Reading error if any
 * @param content - Original file content
 * @returns undefined
 */
const handleFileRead = (readErr, content) => {
  // Catch reading error if any
  if (readErr) {
    console.log("reading error", readErr);
  }

  const lines = content.split("\n");
  let newContent = "";
  let isBody = false;

  // find line where comment starts
  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].trim() === "<body>") {
      isBody = true;
    }
    newContent += `${lines[i]}\n`;

    if (isBody) {
      // write new h1 content
      newContent += "    <h1> WE ADDED THIS </h1>\n";

      const images = copyImages(path);
      newContent += addImages(images);
      isBody = false;
    }
  }

  // Write processed content back to the file, replacing old content
  writeFile(newFile, newContent, (writeErr) => {
    // Catch writing error if any
    if (writeErr) {
      console.log("error writing", newContent, writeErr);
      return;
    }
    console.log("success!");
  });
};

readFile(filename, "utf-8", handleFileRead);

import { readFile, writeFile } from "fs";

/**
 * Read target file, convert contents to Object, call client callback
 * @param {string} filename - JSON DB file name
 * @param {function} handler - Callback for successful file read
 *                                    Takes 1 param, JSON content as JS Object
 */
export const read = (filename, handler) => {
  const handleFileRead = (readErr, jsonContentStr) => {
    console.log("in handleFileRead fn");

    // Catch read error if any
    if (readErr) {
      console.error("Read error", readErr);
    }

    // Parse JSON content str into JS Object
    const jsonContentObj = JSON.parse(jsonContentStr);

    // Call custom logic that our app passed into this module
    handler(jsonContentObj);
  };

  console.log("calling readFile in jsonFileStorage.js");
  readFile(filename, "utf-8", handleFileRead);
};

export const write = (filename, jsonContentObj, handler) => {
  const handleFileWrite = (writeErr, jsonContentObj) => {
    console.log("in handleFileWrite fn");
    // console.log(jsonContentObj);
    if (writeErr) {
      console.log("Write error", writeErr);
    }
  };
  const contentToWriteStr = handler(jsonContentObj);

  console.log("calling writeFile in jsonFileStorage.js");
  writeFile(filename, contentToWriteStr, handleFileWrite);
};

export const add = (filename, key, value, handler) => {
  const handleFileRead = (readErr, jsonContentStr) => {
    if (readErr) {
      console.error("Reading error", readErr);
      return;
    }

    // console.log("read success" + "\n" + jsonContentStr);
    // Parse the JSON string from the file into a JS Object.
    let newContent = {};
    newContent[key] = value;
    const newWriteStr = handler(jsonContentStr, newContent);

    // Write updated JSON to original file, overwriting original contents.
    writeFile(filename, newWriteStr, (writeErr) => {
      if (writeErr) {
        console.error("Writing error", writeErr);
        return;
      }
      console.log("Write success!");
    });
  };

  // Read the file called filename and call handleFileRead on its contents.
  console.log("calling readFile-add in jsonFileStorage.js");
  readFile(filename, "utf-8", handleFileRead);
};

export const edit = (filename, readHandler, writeHandler) => {
  read(filename, (readErr, jsonContentObj) => {
    if (readErr) {
      console.error("read error", readErr);
      readHandler(readErr, null);
      return;
    }

    readHandler(null, jsonContentObj);
    write(filename, jsonContentObj, writeHandler);
  });
};

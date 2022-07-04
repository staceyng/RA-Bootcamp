import { readFile, writeFile } from "fs";
/**
 * Add a key-value pair to the JSON object in the relevant file
 * @param {string} filename - The name of the target JSON file
 * @param {string} key - The name of the key we wish to add
 * @param {*} value - The data that corresponds to the given key
 * @returns undefined
 */
export function add(filename, key, value) {
  const handleFileRead = (readErr, jsonContentStr) => {
    if (readErr) {
      console.error("Reading error", readErr);
      return;
    }

    // Parse the JSON string from the file into a JS Object.
    const jsonContentObj = JSON.parse(jsonContentStr);

    // Add the new key and value to the content object.
    jsonContentObj[key] = value;

    // Transform the updated content object back into a JSON string.
    const updatedJsonContentStr = JSON.stringify(jsonContentObj);

    // Write updated JSON to original file, overwriting original contents.
    writeFile(filename, updatedJsonContentStr, (writeErr) => {
      if (writeErr) {
        console.error("Writing error", writeErr);
        return;
      }
      console.log("Success!");
    });
  };

  // Read the file called filename and call handleFileRead on its contents.
  readFile(filename, "utf-8", handleFileRead);
}

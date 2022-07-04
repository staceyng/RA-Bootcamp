import { add, read, write } from "./jsonFileStorage.js";

// calculate avg temperatures from an array of temps
const handleJsonRead = (jsonContentObj) => {
  console.log("in handleJsonRead fn");
  const tempObj = JSON.parse(JSON.stringify(jsonContentObj));
  const temps = tempObj.temperatures;

  let totalTemp = 0;
  temps.forEach((t) => (totalTemp += t));
  const avgTemp = (totalTemp / temps.length) * 1.0;
  console.log(`Average Temperature: ${avgTemp.toFixed(2)}`);
};

// write JSobj to Json str for writeFile
const handleJsonWrite = (jsonContentObj) => {
  console.log("in handleJsonWrite fn");
  const contentToWrite = JSON.stringify(jsonContentObj, null, 2); // 2 space formatting
  return contentToWrite;
};

const handleJsonAdd = (existingDataStr, newDataObj) => {
  console.log("in handleJsonAdd fn");
  const existingDataObj = JSON.parse(existingDataStr);
  const combinedObj = { ...existingDataObj, ...newDataObj };
  const combinedStr = JSON.stringify(combinedObj, null, 2); // 2 space formatting
  return combinedStr;
};

const main = () => {
  const args = process.argv.slice(2);
  switch (args.length) {
    case 1:
      switch (args[0]) {
        case "write":
          // write json
          console.log("calling write in index.js");
          const dataToWrite = {
            location: "Singapore",
            temperatures: [23, 34, 32, 21],
          };
          write("data.json", dataToWrite, handleJsonWrite);
          return;
        case "read":
          // read and print all temperatures in data.json
          console.log("calling read in index.js");
          read("data.json", handleJsonRead);
          return;
        case "add":
          // add new key and value
          console.log("calling add in index.js");
          add("data.json", "Day", "Monday", handleJsonAdd);
          return;
        // case "edit":
      }

    default:
      console.log("Please input an arg - add, write, read, edit");
      return;
  }
};

main();

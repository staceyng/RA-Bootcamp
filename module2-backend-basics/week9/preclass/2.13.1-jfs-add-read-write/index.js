import { add, read, write } from "./jsonFileStorage.js";

const dataToWrite = { name: "stacey", age: 90, id: "potato19" };
const file = "data.json";

const main = () => {
  const args = process.argv.slice(2);

  switch (true) {
    case args.length < 1:
      console.log("Specify 1 arg - read/ write. Example: node index.js read");
      return;
    case args.length > 1:
      console.log("Too many args! Example: node index.js write");
      return;
    default:
      const type = args[0];
      if (type === "read") {
        read(file);
      } else if (type === "write") {
        write(file, dataToWrite);
      } else if (type === "add") {
        add(file, "theme", "dark");
      } else {
        console.log(`invalid type specified - ${type}`);
        return;
      }
  }
};

main();

import { hostServer } from "./server.js";

const main = () => {
  const args = process.argv.slice(2);

  switch (true) {
    case args.length < 1:
      console.log(
        "Specify 1 arg for port number - Example: node scripts/index.js <port>"
      );
      return;
    case args.length > 1:
      console.log("Too many args! Example: node scripts/index.js <port>");
      return;
    default:
      const portNumber = args[0];
      // process hosting file server
      hostServer(portNumber);
  }
};

main();

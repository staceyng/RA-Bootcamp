import { showColors } from "./cssReader.js";

const main = () => {
  const args = process.argv.slice(2);

  switch (true) {
    case args.length < 1:
      console.log(
        "Specify a css file to read from, example: node index.js <css_file>"
      );
      return;
    case args.length > 2:
      console.log(
        "Too many args, specify only one, example: node index.js <css_file>"
      );
      return;
    default:
      const filename = args[0];
      showColors(filename);
  }
};

main();

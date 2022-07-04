import { showComments, showFunctionParams } from "./parseJs.js";

const main = () => {
  const args = process.argv.slice(2);
  // console.log(args);
  switch (true) {
    case args.length < 1:
      console.log(
        "Specify a JS file and sort method alphabet) default is by line, example node index.js <JS_FILE> <sort> "
      );
      return;
    case args.length > 1:
      const filename = args[0];
      const sortBy = args[1];
      console.log(sortBy);
      showComments(filename, sortBy);
      showFunctionParams(filename, sortBy);
      return;
    default:
      break;
  }
};

main();

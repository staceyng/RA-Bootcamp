console.log("logging process argv");

const args = process.argv;
console.log(args);

// run it as node example2.js tomatoes onions carrots
console.log(`node version: ${args[0]}`);
console.log(`path: ${args[1]}`);
console.log(`arguments: ${args.slice(2)}`);

// args are of type string, to use int/float you have to convert
console.log(`args are strings: ${args[2]} is of type ${typeof args[2]} `);

// run it as node example2.js 11
console.log(
  `arg converted to number: ${
    args[2]
  } is of type ${typeof args[2]}, converted => ${Number(
    args[2]
  )}, ${typeof Number(args[2])} `
);

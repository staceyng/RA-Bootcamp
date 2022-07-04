// ========================================================
// - Celcius-Fahrenheit Converter
// ========================================================

const celciusToFahrenheit = (c) => {
  const f = Number(c) * (9.0 / 5.0) + 32;
  return `${c}C is ${f.toFixed(2)}F`;
};

const fahrenheitToCelcius = (f) => {
  const c = (f - 32) * (5.0 / 9.0);
  return `${f}F is ${c.toFixed(2)}C`;
};

// ========================================================
// - Main
// ========================================================
const main = () => {
  const args = process.argv.slice(4);
  const from = process.argv[2];
  const to = process.argv[3];

  console.log("args: ", args);

  switch (true) {
    case args.length == 0:
      console.log("Specify 1 argument - run as node index.js <arg>");
      return;
  }

  if (from === "celcius" && to === "fahrenheit") {
    for (let i = 0; i < args.length; i++) {
      const c = celciusToFahrenheit(Number(args[i]));
      console.log(c);
    }
  }

  if (from === "fahrenheit" && to === "celcius") {
    for (let i = 0; i < args.length; i++) {
      const c = fahrenheitToCelcius(Number(args[i]));
      console.log(c);
    }
  }
};

main();

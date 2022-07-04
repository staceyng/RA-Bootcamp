console.log("starting");

const delayInMilliseconds = 1000;
let counter = 0;

const ref = setInterval(() => {
  console.log("after 1000ms");
  console.log("counter: " + counter);
  counter += 1;

  if (counter > 10) {
    clearInterval(ref);
  }
}, delayInMilliseconds);

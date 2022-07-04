let milliseconds = 0; // 5s
const delayInMilliseconds = 1000; //1s

// set interval continues running callback fn until clearInterval is called
// takes in callbackFn and interval period(how often to execute code)
const ref = setInterval(() => {
  console.log(milliseconds);

  if (milliseconds >= 10000) {
    //stop at 10s
    clearInterval(ref);
  }
  milliseconds += 1000;
}, delayInMilliseconds);

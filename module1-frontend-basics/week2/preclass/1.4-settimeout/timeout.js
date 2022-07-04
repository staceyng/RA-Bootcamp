console.log("starting...");

const delayInMilliseconds = 1000; // this is one second

const doLater = () => {
  console.log("i happen later!");
};

setTimeout(doLater, delayInMilliseconds); // takes function param, time in ms

console.log("bananas!");

const randomNumber = () => Math.floor(Math.random() * 1000);

const setDelay = (delay) => {
  console.log(`delaying ${delay}`);
  setTimeout(() => {
    console.log("done with timeout");
  }, delay);
};

const doStuff = () => {
  console.log("setting timeout");
  setDelay(randomNumber());
  console.log("after call settimeout");
};

console.log("about to call do stuff");
doStuff();
console.log("finished call do stuff");

//about to call do stuff
// setting timeout
// delaying 852
// after call settimeout
// finished call do stuff
// done with timeout

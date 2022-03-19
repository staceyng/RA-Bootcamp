const randomNumber = () => Math.floor(Math.random() * 1000);

const setDelay = (delay) => {
  console.log(`delaying: ${delay}`);

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(delay), delay);
  });
};

// start all the setTimeouts
// results is a Promise that resolves to an array of values that
// correspond to the resolve values of each element in the Promise.all
// parameter array.
const results = Promise.all([
  setDelay(randomNumber()),
  setDelay(randomNumber()),
  setDelay(randomNumber()),
  setDelay(randomNumber()),
]);

results.then((arrayOfResolvedValues) => {
  console.log("all done");
  console.log(arrayOfResolvedValues);
});

// expected logging
// 4 set delay starts at the same time (but the timeout is different values)
// all done
// [some array]

// actual
// delaying: 437
// delaying: 795
// delaying: 108
// delaying: 38
// all done
// [ 437, 795, 108, 38 ]

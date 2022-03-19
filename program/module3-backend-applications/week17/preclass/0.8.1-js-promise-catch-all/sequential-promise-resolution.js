const randomNumber = () => Math.floor(Math.random() * 1000);

const setDelay = (delay) => {
  console.log(`delaying ${delay}`);

  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(delay), delay);
  });
};

// do nested setTimeouts, one after the other
const result = setDelay(randomNumber()).then((resultOne) => {
  return setDelay(randomNumber()).then((resultTwo) => {
    return setDelay(randomNumber()).then((resultThree) => {
      return setDelay(randomNumber());
    });
  });
});

// run this when they are all done
result.then((lastDelay) => {
  console.log("all done");
  console.log(lastDelay);
});

// expected logging
// delaying 1
// delaying 2
// delaying 3
// delaying 4
// all done
// lastDelay (value)

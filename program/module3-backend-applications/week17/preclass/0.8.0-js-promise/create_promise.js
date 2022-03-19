console.log("creating promise");
const myFirstPromise = new Promise((resolve, reject) => {
  // We call resolve(...) when what we were doing asynchronously was successful.
  // We call reject(...) when what we were doing asynchronously failed.
  // In this example, we use setTimeout(...) to simulate async code.
  // In reality, you will probably be using something like AJAX.
  console.log("setting timeout");
  setTimeout(() => {
    console.log("timeout done, calling resolve");
    resolve("Success!"); // Yay! Everything went well!
    console.log("done calling resolve");
  }, 250);
  console.log("done setting timeout");
});

console.log("about to set .then callback");
myFirstPromise.then((successMessage) => {
  // successMessage is whatever we passed into the resolve(...) function above.
  // It doesn't have to be a string, but if it is only a succeed message, it probably will be.
  console.log(`Yay! ${successMessage}`);
  console.log("done calling .then");
});
console.log("done setting then callback");

// expected print out
// 1, 7, 13, 16, 23, 9, 11, 20, 21

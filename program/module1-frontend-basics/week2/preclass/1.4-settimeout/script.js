const wowParagraph = document.createElement("BUTTON");
document.body.appendChild(wowParagraph);
wowParagraph.innerText = "CLICK HERE";

const doLater = () => {
  wowParagraph.innerText = `cool! ${Math.random()}`;
};

const myNewMain = () => {
  console.log("hey wow my new function");
  setTimeout(doLater, 1000);
};

wowParagraph.addEventListener("click", myNewMain);

console.log("setTimeout! - 1");

///////////////
// exercise //
/////////////
// console.log("setTimeout! - 1");

// const delayInMilliseconds = 1000; // this is one second

// console.log("setTimeout! - 2");

// const doLater = () => {
//   console.log("setTimeout! - 3");
// };

// console.log("setTimeout! - 4");

// setTimeout(doLater, delayInMilliseconds);

// console.log("setTimeout! - 5");
// expected : 1-2-4-3-5 , 3 appears 1 second later
// actual 1-2-4-5-3 , 5 is faster than 1s

const wowParagraph = document.createElement("p");
wowParagraph.innerText = "Click Me!!";
document.body.appendChild(wowParagraph);

console.log("1");

const doLater = () => {
  console.log("2");
  wowParagraph.innerText = `cool! ${Math.random()}`;
};

console.log("3");

const myNewMain = (event) => {
  console.log("4");

  setInterval(doLater, 1000);
};
console.log("5");

wowParagraph.addEventListener("click", myNewMain);
console.log("6");

// 1, 3, 5, 6 -> on click, 4, 2

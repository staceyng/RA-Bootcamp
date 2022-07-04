const nestWords = [
  ["hello", "papaya"],
  ["banana", "world"],
];
const newWords = ["new", "melon"];
let greyBoxCount = 1;

////////////////////////
// Helper Functions  //
//////////////////////
const createGreyBox = () => {
  const greyBox = document.createElement("div");
  greyBox.className = "container";
  const idName = `greyBox${greyBoxCount}`;
  greyBox.setAttribute("id", idName);
  document.body.appendChild(greyBox);

  // add button
  const btn = document.createElement("BUTTON");
  btn.innerHTML = "SUBMIT";
  btn.setAttribute("id", "submit-button");
  document.getElementById(idName).appendChild(btn);

  // add textfield
  const textField = document.createElement("INPUT");
  textField.setAttribute("id", "text-field");
  document.getElementById(idName).appendChild(textField);

  greyBoxCount += 1;

  return { greyBox, btn, textField };
};

const createYellowBox = (gb) => {
  const yellowBox = document.createElement("div");
  yellowBox.className = "row";
  gb.appendChild(yellowBox);
  return yellowBox;
};

// accepts yellowbox dom element yb, and w as []string
const createPinkBox = (yb, w) => {
  for (let i = 0; i < w.length; i++) {
    const pinkBox = document.createElement("span");
    pinkBox.className = "word";
    pinkBox.innerHTML = w[i];
    yb.appendChild(pinkBox);
  }
};

/////////////////
//  Exercise  //
///////////////
const createBox = () => {
  const gb = createGreyBox();
  // console.log(gb);
  gb.btn.addEventListener("click", () => {
    // console.log(document.getElementById("text-field").value);
    textToOmit = document.getElementById("text-field").value;
    const newWordsCopy = [...newWords];
    for (let j = 0; j < newWordsCopy.length; j++) {
      // console.log(newWordsCopy[j]);
      if (textToOmit === newWordsCopy[j]) {
        newWordsCopy.splice(j, 1);
      }
    }
    // console.log(`newWords = ${newWords}`);
    // console.log(`newWordsCopy = ${newWordsCopy}`);
    const yb = createYellowBox(gb.greyBox);
    createPinkBox(yb, newWordsCopy);
  });
  for (let i = 0; i < nestWords.length; i++) {
    const yb = createYellowBox(gb.greyBox);
    createPinkBox(yb, nestWords[i]);
  }
};

const drawButton = () => {
  const btn = document.createElement("BUTTON");
  btn.innerHTML = "GREY";
  // try various events here
  btn.addEventListener("click", createBox);
  document.getElementById("buttons").appendChild(btn);
};

drawButton();

// Base: have 3 buttons on screen, on click draw a grid of 3x3 emojis

const emojiArr = ["🦺 ", "👔 ", "👕 ", "👖 ", "🧣 ", "🧤", "🧥 "];

const drawButtons = () => {
  drawArea = document.getElementById("draw-area");
  buttonRow = document.getElementById("button-row");

  emojiArr.forEach((emoji) => {
    const btn = document.createElement("BUTTON");
    btn.innerHTML = emoji;
    buttonRow.appendChild(btn);
    btn.addEventListener("click", () => drawEmojis(drawArea, emoji, 3));
  });
};

// drawemoji takes params
// d as drawingArea document object,
// e as emoji string, n as grid size
const drawEmojis = (d, e, n) => {
  let output = "<p>"; // open p tag
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      output += e;
    }
    output += "<br>";
  }
  output += "</p>"; // close p tag
  d.innerHTML = output;
};

const base = () => {
  drawButtons();
};

// Comfortable1 : on key press print x rows of emojis - eg. press a, prints a grid of 4x4 emojis, use rand number generator
let userEmoji = "";
const randNumberGenerator = (max) => {
  return Math.floor(Math.random() * max); // random number between 0-20
};

const drawButtonsComfortable1 = () => {
  const drawArea = document.getElementById("draw-area");
  const buttonRow = document.getElementById("button-row");

  emojiArr.forEach((emoji) => {
    const btn = document.createElement("BUTTON");
    btn.innerHTML = emoji;
    buttonRow.appendChild(btn);
    btn.addEventListener("click", () => (userEmoji = emoji));
    document.addEventListener("keypress", () => {
      const randomNumber = randNumberGenerator(20);
      drawEmojis(drawArea, userEmoji, randomNumber);
    });
  });
};

const comfortable1 = () => {
  drawButtonsComfortable1();
};

// Comfortable 2: randomise emoji choice and number of emojis to print by clicking a randomise button?
const comfortable2 = () => {
  const drawArea = document.getElementById("draw-area");
  const buttonRow = document.getElementById("button-row");
  const randomButton = document.createElement("BUTTON");
  randomButton.innerHTML = "?";
  buttonRow.appendChild(randomButton);

  emojiArr.forEach((emoji) => {
    const btn = document.createElement("BUTTON");
    btn.innerHTML = emoji;
    buttonRow.appendChild(btn);
    // buttons here do nothing just for display
  });

  randomButton.addEventListener("click", () => {
    const randomNumber = randNumberGenerator(20);
    const randomEmoji = emojiArr[randNumberGenerator(emojiArr.length)];
    drawEmojis(drawArea, randomEmoji, randomNumber);
  });
};

// Comfortable 3: up and down keypress to reduce row & colums
let randomNumber = randNumberGenerator(20);

const comfortable3 = () => {
  const drawArea = document.getElementById("draw-area");
  const buttonRow = document.getElementById("button-row");
  emojiArr.forEach((emoji) => {
    const btn = document.createElement("BUTTON");
    btn.innerHTML = emoji;
    buttonRow.appendChild(btn);
    btn.addEventListener("click", () => (userEmoji = emoji));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp") {
      randomNumber += 1;
    } else if (event.key == "ArrowDown") {
      if (randomNumber > 0) {
        randomNumber -= 1;
      }
    }
    console.log(randomNumber);
    drawEmojis(drawArea, userEmoji, randomNumber);
  });
};

// main function
const main = () => {
  // base();
  // comfortable1();
  // comfortable2();
  comfortable3();
};

main();

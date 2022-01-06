const defaultWords = ["banana", "world"];
const words = ["banana", "pasta", "alligator", "purple", "accurate", "fickle"];
const nestWords = [
  ["orange", "tomato"],
  ["fire engine", "basketball"],
];

// Helper functions
const createGreyBox = () => {
  const greyBox = document.createElement("div");
  greyBox.className = "container";
  document.body.appendChild(greyBox);
  return greyBox;
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

// create elements in a loop
const createElementsLoop = () => {
  for (let i = 0; i < defaultWords.length; i++) {
    const gb = createGreyBox();
    const yb = createYellowBox(gb);
    createPinkBox(yb, defaultWords);
  }
};

// create element contens from words array
const createElementsArray = () => {
  const gb = createGreyBox();
  const yb = createYellowBox(gb);

  createPinkBox(yb, words);
};

// create elements from nestWords nested array
const createElementsFromNestedArray = () => {
  const gb = createGreyBox();
  for (let i = 0; i < nestWords.length; i++) {
    const yb = createYellowBox(gb);
    createPinkBox(yb, nestWords[i]);
  }
};

// createElementsLoop();
// createElementsArray();
createElementsFromNestedArray();

import { cat } from "./cat.js";
import { mouse } from "./mouse.js";
// webpack import with npm modules
import catNames from "cat-names";
// webpack import with babel
import { arrow } from "./arrowFunction.js";
// webpack import with css
// import "./main.css";
// webpack import with sass
import "./styles.scss";

console.log("This is from index.js");
console.log("This is imported from cat.js = ", cat);
console.log("This is imported from mouse.js = ", mouse);
console.log(
  "This is a random cat name from cat-names library = ",
  catNames.random()
);
// running index.html will cause these printouts to appear in the web console

// the spread operator is a newer feature that is not compatible with older versions of certain browsers
const obj = {
  a: "apple",
  b: "buffalo",
};

const newObj = { ...obj, c: "cheetah" };
console.log("6.1.3 webpack with babel - new obj with spread operator", newObj);

// arrow function from babel polyfill
const arrowTest = arrow();
console.log("arrow function test with babel polyfill: ", arrowTest);

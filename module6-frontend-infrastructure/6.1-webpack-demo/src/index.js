import { cat } from "./cat.js";
import { mouse } from "./mouse.js";
// webpack import with npm modules
import catNames from "cat-names";

console.log("This is from index.js");
console.log("This is imported from cat.js = ", cat);
console.log("This is imported from mouse.js = ", mouse);
console.log(
  "This is a random cat name from cat-names library = ",
  catNames.random()
);
// running index.html will cause these printouts to appear in the web console

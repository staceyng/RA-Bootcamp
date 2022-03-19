import jsSHA from "jssha";

const shaObj = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
shaObj.update("Text to hash.");
const hash = shaObj.getHash("HEX");

console.log("hashed text");
console.log(hash);

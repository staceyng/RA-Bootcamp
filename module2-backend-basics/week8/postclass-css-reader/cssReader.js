import { readFile } from "fs";
import { parseRGBString, rgbToHex } from "./cssConversions.js";

// ========================================================
// - Helper Functions
// ========================================================

const extractStyle = (s) => {
  let style = s.slice(0, s.indexOf("#"));
  style = style.trim();
  style = style.slice(0, -1);
  return style;
};

const extractHexColors = (s) => {
  // #000000; => #000000
  const hexString = s.slice(s.indexOf("#"), -1);
  return hexString;
};

const extractRGBValues = (s) => {
  // rgb(255, 255, 255); => rgb(255, 255, 255)
  const rgbString = s.slice(s.indexOf("rgb"), -1);
  return parseRGBString(rgbString);
};

const outputHeaders = (s) => {
  console.log(`---------\n${s}\n---------`);
};
const outputObject = (myObj) => {
  // given an obj print out keys and values
  myObj.keys(count).forEach(key);
  if (myObj) {
    for (let key in myObj) {
      console.log(`${key}: ${myObj[key]}`);
    }
  }
};

// ========================================================
// - Control Functions
// ========================================================

const handleFileRead = (error, content) => {
  if (error) {
    console.log("readFile error: ", error);
    return;
  }

  const lines = content.split("\n");
  const colors = {};
  const styles = {};

  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].includes("#")) {
      const hexString = extractHexColors(lines[i]);
      if (hexString in colors) {
        colors[hexString] += 1;
      } else {
        colors[hexString] = 1;
      }

      const style = extractStyle(lines[i]);
      if (style in styles) {
        styles[style] += 1;
      } else {
        styles[style] = 1;
      }
    }

    // if (lines[i].includes("rgb")) {
    //   const rgb = extractRGBValues(lines[i]);
    //   const hexString = rgbToHex(rgb.r, rgb.g, rgb.b);
    //   console.log(`rgb detected, converted ${rgb} to ${hexString}`);
    //   if (hexString) {
    //     if (hexString in colors) {
    //       colors[hexString] += 1;
    //     } else {
    //       colors[hexString] = 1;
    //     }
    //   }
    // }
  }

  console.log(colors);
  console.log(styles);

  outputHeaders("colors");
  outputObject(colors);
  outputHeaders("styles");
  outputObject(styles);
};

export const showColors = (filename) => {
  readFile(filename, "utf8", handleFileRead);
};

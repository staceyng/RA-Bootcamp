import {
  rgbToHex,
  hexToRgb,
  hslToRGB,
  rgbToHSL,
  parseHSLString,
  parseRGBString,
} from "./cssConversions.js";
// test file for cssConversions

const processResults = (actual, expected, testName) => {
  let res;
  if (actual === expected) {
    res = "PASSED";
    console.log("\x1b[32m%s\x1b[0m", `[TEST] ${testName} - [${res}]`);
  } else {
    res = "FAILED";
    console.log("\x1b[31m%s\x1b[0m", `[TEST] ${testName} - [${res}]`);
  }
};

const testParseRGBString = () => {
  const testCase = {
    name: "test parse rgb string",
    input: "rgb(192,20,1)",
    expOutput: { r: 192, g: 20, b: 1 },
  };

  let actual = parseRGBString(testCase.input);
  actual = JSON.stringify(actual);
  const expOutput = JSON.stringify(testCase.expOutput);
  processResults(actual, expOutput, testCase.name);
};

const testParseHSLString = () => {
  const testCase = {
    name: "test parse hsl string",
    input: "hsl(180, 100%, 50%)",
    expOutput: { h: 180, s: 1, l: 0.5 },
  };

  let actual = parseHSLString(testCase.input);
  actual = JSON.stringify(actual);
  const expOutput = JSON.stringify(testCase.expOutput);
  processResults(actual, expOutput, testCase.name);
};

const testRGBToHex = () => {
  const testCase = {
    name: "test rgb to hex",
    input: { r: 0, g: 255, b: 255 },
    expOutput: "#00ffff",
  };

  let actual = rgbToHex(testCase.input.r, testCase.input.g, testCase.input.b);
  processResults(actual, testCase.expOutput, testCase.name);
};

const testHexToRGB = () => {
  const testCases = [
    {
      name: "test valid hex to rgb",
      input: "#000080",
      expOutput: { r: 0, g: 0, b: 128 },
    },
    {
      name: "test invalid hex to rgb",
      input: "#12345aa",
      expOutput: null,
    },
  ];

  for (let i = 0; i < testCases.length; i++) {
    const test = testCases[i];
    let actual = hexToRgb(test.input);
    actual = JSON.stringify(actual);
    const expOutput = JSON.stringify(test.expOutput);
    processResults(actual, expOutput, test.name);
  }
};

const testHSLToRGB = () => {
  const testCase = {
    name: "test hsl to rgb",
    input: { h: 0, s: 0, l: 1 },
    expOutput: { r: 255, g: 255, b: 255 },
  };

  let actual = hslToRGB(testCase.input.h, testCase.input.s, testCase.input.l);
  actual = JSON.stringify(actual);
  const expOutput = JSON.stringify(testCase.expOutput);
  processResults(actual, expOutput, testCase.name);
};

const testRGBToHSL = () => {
  const testCase = {
    name: "test rgb to hsl",
    input: { r: 255, g: 255, b: 255 },
    expOutput: { h: 0, s: 0, l: 1 },
  };

  let actual = rgbToHSL(testCase.input.r, testCase.input.g, testCase.input.b);
  actual = JSON.stringify(actual);
  const expOutput = JSON.stringify(testCase.expOutput);
  processResults(actual, expOutput, testCase.name);
};

const mainTest = () => {
  testParseRGBString();
  testParseHSLString();
  testRGBToHex();
  testHexToRGB();
  testHSLToRGB();
  testRGBToHSL();
};

mainTest();

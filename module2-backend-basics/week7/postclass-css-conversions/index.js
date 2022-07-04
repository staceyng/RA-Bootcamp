import {
  rgbToHex,
  hexToRgb,
  hslToRGB,
  rgbToHSL,
  parseHSLString,
  parseRGBString,
} from "./cssConversions.js";

// ========================================================
// - Main
// ========================================================
const main = () => {
  const args = process.argv.slice(3);
  const conversion = process.argv[2];

  console.log("args: ", args);

  switch (true) {
    case args.length == 0:
      console.log(
        "Missing arguments - run as node index.js <conversion> <arg>, example: node index.js hexrgb '#ffffff'"
      );
      return;
    case args.length > 1:
      console.log(
        "Too many arguments - run as node index.js <conversion> <arg>, example: node index.js hexrgb '#ffffff'"
      );
      return;
    default:
      break;
  }

  let rgb;
  let hsl;
  let hex;

  switch (conversion) {
    case "hexrgb":
      rgb = hexToRgb(args[0]);
      rgb
        ? console.log(`${args[0]} => r: ${res.r}, g: ${res.g}, b: ${res.b}`)
        : console.log("unable to convert hex to rgb");
      return;
    case "rgbhex":
      rgb = parseRGBString(args[0]);
      hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      console.log(`${args[0]} => ${hex}`);
      return;
    case "rgbhsl":
      rgb = parseRGBString(args[0]);
      hsl = rgbToHSL(rgb.r, rgb.g, rgb.b);
      console.log(`${args[0]} => h: ${hsl.h}, s: ${hsl.s}, l: ${hsl.l}`);
      return;
    case "hslrgb":
      hsl = parseHSLString(args[0]);
      rgb = hslToRGB(hsl.h, hsl.s, hsl.l);
      console.log(`${args[0]} => r: ${rgb.r}, g: ${rgb.g}, b: ${rgb.b}`);
      return;
    case "hslhex":
      hsl = parseHSLString(args[0]);
      rgb = hslToRGB(hsl.h, hsl.s, hsl.l);
      hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      console.log(`${args[0]} => ${hex}`);
      return;
    case "hexhsl":
      rgb = hexToRgb(args[0]);
      if (rgb) {
        hsl = rgbToHSL(rgb.r, rgb.g, rgb.b);
        console.log(`${args[0]} => h: ${hsl.h}, s: ${hsl.s}, l: ${hsl.l}`);
        return;
      } else {
        console.log("unable to convert hex to hsl");
        return;
      }
    default:
      return "no conversion found, allowed conversions - [hexrgb, hexhsl, rgbhex, rgbhsl, hslrgb, hslhex]";
  }
};

main();

// ========================================================
// - Command line tests
// ========================================================
// node index.js hexrgb '#000080'
// node index.js rgbhex 'rgb(0,0,128)'
// node index.js rgbhsl 'rgb(0,0,128)'
// node index.js hslrgb 'hsl(0,0,100%)'
// node index.js hslhex 'hsl(0,0,100%)'
// node index.js hexhsl '#FFFFFF'

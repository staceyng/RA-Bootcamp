// ========================================================
// - Color Converter Functions
// ========================================================

export const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

export const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const hslToRGB = (h, s, l) => {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);

  return { r, g, b };
};

export const rgbToHSL = (r, g, b) => {
  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h, s, l };
};

// ========================================================
// - Helper Functions
// ========================================================
export const parseRGBString = (str) => {
  // 'rgb(255,255,255)' - find , to separate rgb values, extract numbers only
  const arr = str.split(","); //[ 'rgb(255', '255', '255)' ]
  let r = arr[0].replace("rgb(", "");
  r = Number(r);
  let g = arr[1];
  g = Number(g);
  let b = arr[2].replace(")", "");
  b = Number(b);
  return { r, g, b };
};

export const parseHSLString = (str) => {
  // 'hsl(180, 50%, 50%)'
  const arr = str.split(","); //[ 'hsl(180, 50%, 50%)' ]
  let h = arr[0].replace("hsl(", "");
  h = Number(h);
  let s = arr[1].slice(0, -1);
  s = Number(s) / 100.0;
  let l = arr[2].replace("%)", "");
  l = Number(l) / 100.0;
  return { h, s, l };
};

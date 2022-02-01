export const rgbToHex = (r, g, b) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

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

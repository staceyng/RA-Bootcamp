console.log("define say");

const say = (word) => {
  console.log("about to throw");
  throw "throwed";
  console.log("we threw");

  // normal part of say function
  console.log(word);
};

const yell = (word) => {
  say(word.toUpperCase());
};

yell("hello world");

// define say
// about to throw

// /Users/staceyng/Repos/RA/RA-Bootcamp/program/module4-backend-structure/week24/preclass/0.8.2-try-catch/multi-throw.js:5
//   throw "throwed";
//   ^
// throwed
// (Use `node --trace-uncaught ...` to show where the exception was thrown)

const main = () => {
  console.log("MAIN"); //3 , even if setTimeout duration is 0
};
console.log("before timeout"); //1
setTimeout(main, 3000);
console.log("after timeout"); //2

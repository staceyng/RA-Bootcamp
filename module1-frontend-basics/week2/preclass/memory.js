let array1 = [1, 2, 3];
let array2 = [...array1]; // spread operator copies the array (shallow copy)
let array3 = array1;
//changing operations on array2 will not affect array1 since its a copy
array2.push(4);
console.log(array1, array2);

//changing operations on array3 will affect array1 since its a reference
array3.pop();
console.log(array1, array3);

// array functions
let arr = [
  { name: "ace", rank: 1 },
  { name: "jack", rank: 11 },
  { name: "eight", rank: 8 },
];

arrCopy = [...arr];
arrCopy.sort((a, b) => a.rank - b.rank);

console.log(arrCopy);

var oldObject = {
  name: "A",
  address: {
    street: "Station Road",
    city: "Pune",
  },
};
// convert oldObject into a string, back to an obj to "copy", spread operator works too
var newObject = JSON.parse(JSON.stringify(oldObject));
// amend new address
newObject.address.city = "Delhi";
console.log("newObject");
console.log(newObject);
console.log("oldObject");
console.log(oldObject);

var myObj = { profile: { name: "potato", addr: "dhfjkasd" } };
var newObj = { ...myObj };
newObj.profile.name = "cabbage";
console.log(myObj, newObj);

// note primitive values are immutable
let pInt = 1;
let pInt2 = pInt; // assign value 1 to variable pInt2
pInt = 3;
console.log(pInt, pInt2); // 3, 1

let pString = "hello";
let pString2 = pString; // assign value 1 to variable pInt2
pString = "WHAT";
console.log(pString, pString2); // WHAT, hello

const row = ["X", "O", "X"];
const [left, center] = row;
console.log(left); // Output 'X'
console.log(center); // Output 'O'

const user = { name: "kai" };
const { name } = user; // Create a new variable called name
console.log(name); // Output 'kai'

// shallow copy
const temperatures = [23, 12, 45];
const temperaturesCopy = temperatures; // New var is reference to temperatures.
temperatureCopy.pop(); // This mutates the original temperatures array.

temperaturesCopy = [...temperatures];
temperatureCopy.pop(); // This does not mutate the original temperatures array.

// concatenate array
const names = ["susan chan", "garfield"];
const names2 = ["alex", "chee kean"];
const combinedArray = [...names, ...names2]; // has all four elements inside

// concatenate obj
const userData = { name: "kai" };
const userData2 = { height: 6 };
const combinedUserData = { ...userData, ...userData2 }; // has both keys inside

// array of function params
const add = (...numbers) => {
  let total = 0;
  for (let i = 0; i < numbers.length; i += 1) {
    total += numbers[i];
  }
  return total;
};
add(2, 2, 2); // will return 6
add(1, 1, 1, 1, 1, 1); // will also return 6

import axios from "axios";

// Make a request
const getRequestPromise = axios.get("http://localhost:3004");

// Define the callback
const whenRequestHasResponse = (resolve, reject) => {
  // Handle request success
  console.log(resolve);
  console.log(reject);
};

// Tell the program to call the callback on request success.
getRequestPromise.then(whenRequestHasResponse);

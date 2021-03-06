import { get } from "http";

const localEndpoint = "http://127.0.0.1:3004";
const googleEndpoint = "https://www.google.com/";
const customEndpoint = "http://info.cern.ch/";
let endpoint = "";

switch (process.argv[2]) {
  case "local":
    endpoint = localEndpoint;
    break;
  case "google":
    endpoint = googleEndpoint;
    break;
  default:
    endpoint = customEndpoint;
    break;
}

const handleResponse = (response) => {
  // Compile response data in a data variable.
  // The response may contain multiple "chunks" of data.
  let data = "";

  // Add chunk of data to data var when each "chunk" is received.
  response.on("data", (chunk) => {
    data += chunk;
  });

  // We have received the whole response. Print the full response data.
  response.on("end", () => {
    console.log("Response Data: ", data);
  });
};

// Send an HTTP GET request, handle response with handleResponse callback.
// Handle errors by logging the error message.
get(endpoint, handleResponse).on("error", (err) => {
  console.error("Error: " + err.message);
});

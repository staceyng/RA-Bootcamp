// createServer comes from the http module built-in to Node.
import { createServer } from "http";

const handleIncomingRequest = (request, response) => {
  console.log("Received request!");
  const customHeader = { rocketacademy: true };

  // response.end tells the server to send the completed response and mark
  // this request-response interaction complete.
  // https://nodejs.org/api/http.html#http_response_end_data_encoding_callback

  // write custom header, change status code
  response.writeHead(200, customHeader);
  // redirect
  response.writeHead(301, { Location: "http://info.cern.ch/" });

  response.end("YAY, SERVER.JS IS RUNNING!", "utf-8");
};

// createServer creates the server object. It accepts a request listener function.
// The server calls the function every time it receives a request.
// The listen method tells server to start listening for requests on given port.
createServer(handleIncomingRequest).listen(3004);

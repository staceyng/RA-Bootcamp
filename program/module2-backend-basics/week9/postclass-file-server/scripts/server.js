import { createServer } from "http";
import { readFile } from "fs";

const MIMETYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".wav": "audio/wav",
  ".mp4": "video/mp4",
  ".woff": "application/font-woff",
  ".ttf": "application/font-ttf",
  ".eot": "application/vnd.ms-fontobject",
  ".otf": "application/font-otf",
  ".wasm": "application/wasm",
};

const handleIncomingRequest = (request, response) => {
  // request.url contains the portion of the URL after the domain.
  // E.g. for https://ra.co/index.html, request.url would return "/index.html".
  const filePath = "." + request.url; // filePath => ./public/sample.json

  if (isEasterEgg(filePath)) {
    response.writeHead(200, {
      "Content-Type": "text/html",
      "rocket-academy-secret-word": "blastoff",
    });
    response.end("hello banana", "utf-8");
    return;
  }

  const c = checkExtType(filePath);
  if (c.error != null) {
    response.writeHead(500);
    response.end(c.error, "utf-8");
    return;
  }

  readFile(filePath, (err, content) => {
    if (err) {
      const errorContent = `Sorry we couldn't find your page! - ${request.url}`;
      console.error("[ERROR] error reading file", err);
      response.writeHead(404);
      response.end(errorContent, "utf-8");
      return;
    }

    // no errors return 200 and content read
    response.writeHead(200, { "Content-Type": c.contentType });
    response.end(content, "utf-8"); // does response.end == return?
  });
};

const checkExtType = (path) => {
  const p = path.toLowerCase();
  let contentType = null;
  let error = null;

  // extract file ext from path
  const ext = p.slice(p.lastIndexOf(".")).trim();

  if (!(ext in MIMETYPES)) {
    const errMsg = `[ERROR] Invalid ext type found - ${ext}`;
    error = errMsg;
    console.log(errMsg);
    return { contentType, error };
  }

  // determine content type from ext
  contentType = MIMETYPES[ext];
  return { contentType, error };
};

const isEasterEgg = (path) => path.toLowerCase() === "./banana"; // in case there is a public/banana.html if i were to use includes?

export const hostServer = (portNumber) =>
  createServer(handleIncomingRequest).listen(portNumber);

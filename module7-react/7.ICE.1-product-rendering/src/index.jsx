import React from "react";
import { createRoot } from "react-dom/client";
import data from "./data.json";
import "./styles.scss";
import moment from "moment";
// Create JSX list element and loop through it.
// console.log(data.items); // array
const jsxListItems = data.items.map((carObj) => (
  <li
    className={carObj.id % 2 == 0 ? "white" : "grey"}
    key={carObj.id.toString()}
  >
    <p>id: {carObj.id}</p>
    <p>name: {carObj.name}</p>
    <p>description: {carObj.description}</p>
    <p>created: {moment(carObj.createdAt).fromNow()}</p>
    <p>updated: {moment(carObj.updatedAt).fromNow()}</p>
  </li>
));
// console.log(jsxListItems);
// console.log(moment("2020-12-28T09:02:15.112Z").format("YYYY-MM-DD"));
const myEl = (
  <div>
    <h1>Cars</h1>
    <ul>{jsxListItems}</ul>
  </div>
);
// console.log("myEl: ", myEl);

// Create root element to render other elements into, add root element to DOM.
const rootElement = document.createElement("div");
document.body.appendChild(rootElement);

// Create React root component with root DOM element
const rootComponent = createRoot(rootElement);

// Render the myEl JSX element in the root component
rootComponent.render(myEl);

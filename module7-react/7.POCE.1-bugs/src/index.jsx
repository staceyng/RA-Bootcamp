import React from "react";
import { createRoot } from "react-dom/client";
import data from "./data.json";
import "./styles.scss";
import moment from "moment";

// Create JSX list element and loop through it.
// console.log(data.bugs); // array

let featureMap = {};
const getrandomColor = () => Math.floor(Math.random() * 16777215).toString(16);

data.bugs.forEach((b) => {
  const featureName = b.Feature.name;
  if (!(featureName in featureMap)) {
    featureMap[featureName] = `#${getrandomColor()}`;
  }
});

console.log(featureMap); // keys = featureName, values = randomColor

const jsxListItems = data.bugs.map((bugObj) => (
  <li
    style={{ backgroundColor: featureMap[bugObj.Feature.name].toString() }}
    key={bugObj.id.toString()}
  >
    <p>id: {bugObj.id}</p>
    <p>problem: {bugObj.problem}</p>
    <p>error text: {bugObj.errorText}</p>
    <p>created: {moment(bugObj.createdAt).fromNow()}</p>
    <p>updated: {moment(bugObj.updatedAt).fromNow()}</p>
    <p>user email: {bugObj.User.email}</p>
    <p>feature: {bugObj.Feature.name}</p>
  </li>
));

const myEl = (
  <div>
    <h1>Bugs</h1>
    <ul>{jsxListItems}</ul>
  </div>
);

// Create root element to render other elements into, add root element to DOM.
const rootElement = document.createElement("div");
document.body.appendChild(rootElement);

// Create React root component with root DOM element
const rootComponent = createRoot(rootElement);

// Render the myEl JSX element in the root component
rootComponent.render(myEl);

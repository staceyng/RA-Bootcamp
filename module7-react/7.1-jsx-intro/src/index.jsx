import React from "react";
import { render } from "react-dom";
import "./styles.scss";

const myRandomNum = Math.random() * 10;

// Value of message depends on value of myRandomNum
let message;
if (myRandomNum > 5) {
  message = <p>Wow past 5!!</p>;
} else {
  message = <p>Not that big of a num :</p>;
}

// Create a JSX element using myRandomNum and message
const myEl = (
  <div>
    <h1 className="hero-text">
      Hey <span className="warning">Wow!</span>
    </h1>
    <div>
      <p>{myRandomNum}</p>
      {myRandomNum > 5 && <p>Wow! Big numbers!</p>}
    </div>
  </div>
);
// Verify the element is what we expect
console.log("myEl:", myEl);

// Create an element for React to render additional elements into
const rootElement = document.createElement("div");
// Put that element onto the page
document.body.appendChild(rootElement);
// Have React render the new JSX element into the root element
render(myEl, rootElement);

import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.scss";

// Use object decomposition to extract the warning prop from the props param.
function BigText({ warning }) {
  return (
    <h1 className="hero-text">
      {/* Render the warning prop. CSS class name "warning" is unrelated. */}
      Hey <span className="warning">{warning}</span>
    </h1>
  );
}

function BigAnnouncement() {
  const myEl = (
    <div>
      {/* Pass warning prop to BigText */}
      <BigText warning="watch out!" />
      <p>Lorem Ipsum!!</p>
    </div>
  );
  console.log("myEl:", myEl);
  return myEl;
}

// Create root element to render React elements into
const rootElement = document.createElement("div");
// Append root element to document
const root = createRoot(rootElement);
document.body.appendChild(rootElement);
// createRoot(container!) if you use TypeScript
root.render(<BigAnnouncement />);

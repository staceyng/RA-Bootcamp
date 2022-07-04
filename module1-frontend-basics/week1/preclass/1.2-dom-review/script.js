// Please implement exercise logic here
const input = document.querySelector("#input-field");
const button = document.querySelector("#submit-buttons");

const myButtonClicked = () => {
  const typedValue = input.value;
  const newHtwo = document.createElement("h2");
  newHtwo.innerText = typedValue;
  document.body.appendChild(newHtwo);
  input.value = "";
};

button.addEventListener("click", myButtonClicked);

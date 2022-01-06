let userName = "";

const createUserElements = () => {
  const input = document.createElement("INPUT");
  input.setAttribute("type", "text");
  input.id = "user-input-field";
  input.className = "userInput";
  input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      // this value might change "Enter" for firefox
      e.preventDefault();
      userName = e.target.value;
      localStorage.setItem("userName", userName);
      clearUserInput();
      location.href = "game.html";
    }
  });

  const submitBtn = document.createElement("BUTTON");
  submitBtn.id = "submit-btn";
  submitBtn.className = "submitBtn";
  submitBtn.innerHTML = "SUBMIT";
  submitBtn.addEventListener("click", () => {
    userName = input.value;
    localStorage.setItem("userName", userName);
    userNameValidator();
    clearUserInput();
    location.href = "game.html";
  });

  return { input, submitBtn };
};

const userNameValidator = () => {
  if (userName.length == 0) {
    userName = "Player1";
    localStorage.setItem("userName", userName);
  }
};

export const clearUserInput = () => {
  console.log("clear elements");
  const input = document.getElementById("user-input-field");
  const submitBtn = document.getElementById("submit-btn");

  document.body.removeChild(input);
  document.body.removeChild(submitBtn);
};

const main = () => {
  const u = createUserElements();
  document.body.appendChild(u.input);
  document.body.appendChild(u.submitBtn);
};

main();

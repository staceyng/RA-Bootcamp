const mainContainer = document.createElement("div");
mainContainer.id = "main-container";

const lapDataBox = document.createElement("div");
lapDataBox.className = "box";
lapDataBox.id = "lap-data-box";
lapDataBox.innerHTML = "Lap Data";

const elapsedTimeBox = document.createElement("div");
elapsedTimeBox.className = "box";
elapsedTimeBox.id = "elapsed-time-box";
elapsedTimeBox.innerHTML = "Lapsed Time";

const startButton = document.createElement("button");
startButton.className = "box";
startButton.id = "start-button";
startButton.innerHTML = "START";

const stopButton = document.createElement("button");
stopButton.innerHTML = "STOP";
stopButton.className = "box";
stopButton.id = "stop-button";

const resetButton = document.createElement("button");
resetButton.className = "box";
resetButton.id = "reset-button";
resetButton.innerHTML = "RESET";

const lapButton = document.createElement("button");
lapButton.className = "box";
lapButton.id = "lap-button";
lapButton.innerHTML = "LAP";

const main = () => {
  document.body.appendChild(mainContainer);
  mainContainer.appendChild(lapDataBox);
  mainContainer.appendChild(elapsedTimeBox);
  mainContainer.appendChild(startButton);
  mainContainer.appendChild(stopButton);
  mainContainer.appendChild(resetButton);
  mainContainer.appendChild(lapButton);
};

main();

let lat = 0;
let lon = 0;

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  var crd = pos.coords;

  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  lat = crd.latitude;
  lon = crd.longitude;
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);

function clearDiv() {
  document.getElementById("myList").innerHTML = "";
}

document.getElementById("button2").addEventListener("click", async () => {
  clearDiv();
  //show the loading overlay
  JsLoadingOverlay.show();

  axios
    .get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max&timezone=Asia%2FSingapore`
    )
    .then((result) => {
      console.log(result);

      const temps = result.data.daily.temperature_2m_max;

      // hide the loading overlay
      JsLoadingOverlay.hide();

      const resultsDisplay = document.createElement("div");
      let list = document.getElementById("myList");
      temps.forEach((item) => {
        let li = document.createElement("li");
        console.log(item);
        li.innerText = item;
        list.appendChild(li);
      });

      resultsDisplay.appendChild(list);

      document.getElementById("results").appendChild(resultsDisplay);
    })
    .catch((error) => {
      // hide the loading overlay
      JsLoadingOverlay.hide();
      console.log(error);
    });
});

document.getElementById("button1").addEventListener("click", async () => {
  clearDiv();
  console.log("Accessing Weather Data");
  //show the loading overlay
  JsLoadingOverlay.show();

  axios
    .get(
      `https://api.open-meteo.com/v1/forecast?latitude=1.2894&longitude=103.8500&daily=temperature_2m_max&timezone=Asia%2FSingapore`
    )
    .then((result) => {
      console.log(result);
      console.log(result.data.daily.temperature_2m_max);

      const temps = result.data.daily.temperature_2m_max;

      // hide the loading overlay
      JsLoadingOverlay.hide();

      const resultsDisplay = document.createElement("div");
      let list = document.getElementById("myList");
      temps.forEach((item) => {
        let li = document.createElement("li");
        console.log(item);
        li.innerText = item;
        list.appendChild(li);
      });

      resultsDisplay.appendChild(list);

      document.getElementById("results").appendChild(resultsDisplay);
    })
    .catch((error) => {
      // hide the loading overlay
      JsLoadingOverlay.hide();
      console.log(error);
    });
});

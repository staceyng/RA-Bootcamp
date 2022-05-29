const handleOnFeatureFormLoad = async () => {
  console.log("load features");
  const url = "/features";

  axios({
    method: "get",
    url: url,
  })
    .then((response) => {
      console.log(response);
      const features = response.data;
      console.log(features);

      const featureList = document.getElementById("available-features");
      features.forEach((f) => {
        let labelValue = document.createElement("li");
        labelValue.innerHTML = f.name;
        featureList.appendChild(labelValue);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

handleOnFeatureFormLoad();

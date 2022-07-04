const handleOnBugFormLoad = async () => {
  console.log("load features");
  const url = "/features";

  axios({
    method: "get",
    url: url,
  })
    .then((response) => {
      console.log(response);
      const features = response.data;

      const featureDiv = document.getElementById("feature-div");
      features.forEach((obj, i) => {
        console.log(obj);
        console.log(i);
        let labelValue = document.createElement("label");
        labelValue.innerHTML = obj.name;

        let inputValue = document.createElement("input");
        inputValue.type = "radio";
        inputValue.id = i + 1;
        inputValue.name = "feature_id";
        inputValue.value = i + 1;
        featureDiv.appendChild(inputValue);
        featureDiv.appendChild(labelValue);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

handleOnBugFormLoad();

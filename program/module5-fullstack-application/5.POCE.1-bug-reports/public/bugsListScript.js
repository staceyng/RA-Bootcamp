let featureMap = {};

axios({ method: "get", url: "/features" })
  .then((response) => {
    console.log(response);
    const features = response.data;
    features.forEach((f) => {
      featureMap[f.id] = f.name;
    });
  })
  .catch((err) => {
    console.log(err);
  });

const handleBugsListLoad = async () => {
  console.log("load bugs");
  console.log(featureMap);

  axios({ method: "get", url: "/bugs" })
    .then((response) => {
      console.log(response.data);
      const bugs = response.data;
      const bugsTable = document.getElementById("bugs-table");

      bugs.forEach((b, i) => {
        let row = bugsTable.insertRow(-1);
        let c0 = row.insertCell(0);
        c0.innerHTML = b.id;
        let c1 = row.insertCell(1);
        c1.innerHTML = b.problem;
        let c2 = row.insertCell(2);
        c2.innerHTML = b.error_text;
        let c3 = row.insertCell(3);
        c3.innerHTML = b.commit;
        let c4 = row.insertCell(4);
        c4.innerHTML = featureMap[b.feature_id];
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

handleBugsListLoad();

// {
//   id: 3,
//   problem: 'unable to click login button',
//   error_text: 'cors error',
//   commit: '123',
//   feature_id: 1,
//   updatedAt: 2022-05-28T15:14:46.220Z,
//   createdAt: 2022-05-28T15:14:46.220Z,
//   featureId: 1
// }

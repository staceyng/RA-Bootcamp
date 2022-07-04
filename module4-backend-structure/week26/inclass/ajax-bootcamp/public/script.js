const onClick = (event) => {
  console.log("clicked get item!");
  console.log(event);
  getItem();
};

const getItem = () => {
  axios
    .get("/items")
    .then((resp) => {
      console.log(resp.data.items);
      renderItems(resp.data.items);
    })
    .catch((err) => {
      console.log(err);
    });
};

const renderItems = (items) => {
  const sect = document.getElementById("item-section");
  items.forEach((i) => {
    const para = document.createElement("p");
    para.textContent = `id=${i.id}, name=${i.name}, description=${i.description}`;
    sect.append(para);
  });
};

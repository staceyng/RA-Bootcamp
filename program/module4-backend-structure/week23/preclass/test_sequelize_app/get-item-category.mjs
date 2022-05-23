import db from "./models/index.mjs";

// with promise chaining
// db.Item.findOne({
//   where: {
//     name: [process.argv[2]],
//   },
// })
//   .then((item) => item.getCategory())
//   .then((itemCategory) => console.log("found: ", itemCategory.name))
//   .catch((error) => console.log(error));

const getItemsCategory = async () => {
  try {
    const item = await db.Item.findOne({
      where: {
        name: [process.argv[2]],
      },
    });
    const itemCategory = await item.getCategory();
    console.log(itemCategory.name);
  } catch (error) {
    console.log(error);
  }
};

getItemsCategory();

import db from "./models/index.mjs";

// with promise chaining
// db.Category.findOne({
//   where: {
//     name: [process.argv[2]],
//   },
// })
//   // When we omit curly braces in arrow functions, the return keyword is implied.
//   .then((category) => category.getItems())
//   .then((categoryItems) =>
//     console.log(categoryItems.map((categoryItem) => categoryItem.name))
//   )
//   .catch((error) => console.log(error));

// with async await + try catch
const getCategorysItems = async () => {
  try {
    const category = await db.Category.findOne({
      where: {
        name: [process.argv[2]],
      },
    });
    const categoryItems = await category.getItems();
    console.log(categoryItems.map((categoryItem) => categoryItem.name));
  } catch (error) {
    console.log(error);
  }
};

getCategorysItems();

import {
  getMeals,
  getMealsByType,
  logMealEntry,
  setupTables,
  updateMeal,
} from "./db.js";

const main = () => {
  const args = process.argv.splice(2);
  switch (true) {
    case args.length === 1:
      // get meal or setup table
      if (args[0] === "report") {
        getMeals();
      } else if (args[0] === "setup") {
        setupTables();
      }
      break;
    case args.length === 2:
      // get meals by type
      const allowedTypes = [
        "hungry",
        "not-hungry",
        "breakfast",
        "lunch",
        "dinner",
        "drink",
        "week-so-far",
        "past-week",
      ];
      const type = args[1];
      if (allowedTypes.includes(type)) {
        getMealsByType(type);
      }
      break;
    case args.length === 4:
      // update a meal log
      if (args[0] === "edit") {
        const mealID = args[1];
        const colName = args[2];
        const colVal = args[3];
        updateMeal(mealID, colName, colVal);
        break;
      }
    case args.length === 5:
      // add new meal log
      if (args[0] === "log") {
        const type = args[1];
        const des = args[2];
        const alchohol = args[3];
        const wasHungry = args[4];
        logMealEntry(type, des, alchohol, wasHungry);
      }
      break;
    default:
      console.error("not enough args provided");
      break;
  }
};

main();

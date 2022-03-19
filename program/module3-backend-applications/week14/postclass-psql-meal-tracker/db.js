import pg from "pg";
const { Client } = pg;
import { formatData, getEpochTimeNow } from "./formatter.js";

const userName = "staceyng";
const databaseName = "testdb";
let reportType = "";

// set the way we will connect to the server
const pgConnectionConfigs = {
  user: userName,
  host: "localhost",
  database: databaseName,
  port: 5432, // Postgres server always runs on this port
};

const client = new Client(pgConnectionConfigs);

const whenQueryDone = (error, result) => {
  // this error is anything that goes wrong with the query
  if (error) {
    console.log("[DB] query error", error);
    return;
  } else {
    // rows key has the data
    // console.log(result.rows);
    if (result.rows.length <= 0) {
      console.log("[DB] no results");
      client.end();
      return;
    }

    const meals = result.rows;
    if (reportType === "drink") {
      calculateAlchohol(meals);
    } else {
      formatData(meals);
    }
  }

  // close the connection
  client.end();
};

//================================
// create table in testdb
//================================
export const setupTables = () => {
  client.connect();
  const createQuery = `
  CREATE TABLE meals (
    id SERIAL PRIMARY KEY,
    type TEXT,
    description TEXT,
    amount_of_alchohol INT,
    was_hungry_before_eating BOOLEAN
  );
  `;
  client.query(createQuery, whenQueryDone);
  console.log("meals table successfully created");
};

//================================
// DB CRUD
//================================

export const logMealEntry = (type, des, amtAlcohol, hungryBeforeEating) => {
  client.connect();
  const insertData = [
    type,
    des,
    amtAlcohol,
    hungryBeforeEating,
    getEpochTimeNow(),
  ];
  const insertQuery = `
  INSERT into meals (type, description, amount_of_alchohol, was_hungry_before_eating, created_at)
  VALUES ($1, $2, $3, $4, $5);
  `;
  client.query(insertQuery, insertData, whenQueryDone);
  console.log("new meal log successfully added");
};

export const getMeals = () => {
  client.connect();
  const getQuery = `SELECT * from meals;`;
  client.query(getQuery, whenQueryDone);
};

export const getMealsByType = (type) => {
  const hungryType = ["hungry", "not-hungry"];
  const mealType = ["breakfast", "lunch", "dinner"];
  const drinkType = ["drink"];
  const rangeType = ["week-so-far", "past-week"];

  let colName = "";
  let val = false;
  let getQueryByType = "";
  let start = 0;
  let end = 9999999999;

  if (mealType.includes(type)) {
    colName = "type";
    getQueryByType = `
    SELECT * from meals
    WHERE ${colName} = '${type}';
  `;
  }

  if (hungryType.includes(type)) {
    colName = "was_hungry_before_eating";
    val = type === "hungry" ? true : false;
    getQueryByType = `
    SELECT * from meals
    WHERE ${colName} = '${val}';
  `;
  }

  if (drinkType.includes(type)) {
    reportType = type;

    getQueryByType = `
    SELECT amount_of_alchohol, COUNT(*)
    FROM meals
    GROUP BY amount_of_alchohol;
    `;
  }

  if (rangeType.includes(type)) {
    if (type === "week-so-far") {
      start = getEpochTimeNow();
      end = start + 3600 * 24 * 7;
    }

    if (type === "past-week") {
      end = getEpochTimeNow();
      start = end - 3600 * 24 * 7;
    }

    console.log(start, end);
    getQueryByType = `
    SELECT * from meals
    WHERE meals.created_at
    BETWEEN ${Number(start)} AND ${Number(end)};
    `;
  }

  client.connect();
  client.query(getQueryByType, whenQueryDone);
};

export const updateMeal = (id, colName, colVal) => {
  client.connect();
  // TODO check colname, colval, id types
  const updateQuery = `
  UPDATE meals 
  SET ${colName} = '${colVal}'
  WHERE id = '${id}';
  `;
  client.query(updateQuery, whenQueryDone);
  console.log(`updated meal log of id:${id} with ${colName}=${colVal}`);
};

//================================
// Calculate alchohol consumption
//================================

const calculateAlchohol = (data) => {
  // const data = [
  //   { amount_of_alchohol: 0, count: "6" },
  //   { amount_of_alchohol: 1, count: "1" },
  //   { amount_of_alchohol: 2, count: "1" },
  // ];
  let total = 0;
  let totalAlchohol = 0;
  let totalAlchoholConsumed = 0;
  data.forEach((d) => {
    const v = Number(d.count);
    total += v;
    const k = d.amount_of_alchohol;
    if (k > 0) {
      totalAlchohol += v;
      totalAlchoholConsumed += k * v;
    }
  });

  // console.log(total);
  // console.log(totalAlchohol);
  // console.log(totalAlchoholConsumed);
  // how often alcohol is consumed per meal
  console.log(
    `Ratio of alchohol to total meals => ${totalAlchohol} : ${total}`
  );
  // average amt of alchohol per meal
  console.log(
    `Average alchohol consumption per meal => ${(
      totalAlchoholConsumed / total
    ).toFixed(3)}`
  );
};

import pg from "pg";
const { Pool } = pg;

// set the way we will connect to the server
const pgConnectionConfigs = {
  user: "staceyng",
  host: "localhost",
  database: "ra_gym",
  port: 5432, // Postgres server always runs on this port
};

const pool = new Pool(pgConnectionConfigs);

const [
  appName, // 0
  scriptName,
  cmdName,
  workoutName,
  workoutDate,
  ...workoutExercises
] = process.argv;

// create the query done callback
const whenQueryDone = (error, result) => {
  // this error is anything that goes wrong with the query
  if (error) {
    console.log("error", error);
    return;
  }

  const data = result.rows; //arr of objs

  data.forEach((e) => {
    console.log(`${e.id}. ${e.name}`);
  });
};

if (process.argv[2] === "exercises") {
  const sqlQuery = "SELECT * from exercises";
  pool.query(sqlQuery, whenQueryDone);
}

if (process.argv[2] === "add-workout") {
  const inputData = [workoutName, workoutDate];
  const sqlQuery = `
  INSERT INTO workouts (name, date)
  VALUES ($1, $2)
  RETURNING *;
  `;

  pool.query(sqlQuery, inputData, (error, result) => {
    if (error) {
      console.log("error", error);
      return;
    }

    const data = result.rows[0]; // this will return entry in workout
    const workoutId = data.id;

    let addQuery =
      "INSERT INTO exercise_workouts (exercise_id, workout_id) VALUES ";
    workoutExercises.forEach((w) => {
      // let addData = [w, workoutId];
      addQuery += `(${w}, ${workoutId}),`;
    });
    const sliced = addQuery.slice(0, -1);
    console.log(sliced);

    pool.query(sliced, (error, result) => {
      if (error) {
        console.log("add exercise workout error: ", error);
        return;
      }
      console.log(result.rows);
    });
  });
}

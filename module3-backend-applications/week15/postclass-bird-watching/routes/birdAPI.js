import pg from "pg";
import { pgConnectionConfigs } from "../utils/db.js";
import { getEpochTimeNow } from "../utils/time.js";

const birdTableName = "birds";
const speciesTableName = "species";
const birdBehaviorsTableName = "bird_behaviors";
const behaviorsTableName = "behaviors";
const commentTableName = "comments";

const { Pool } = pg;
const pool = new Pool(pgConnectionConfigs);

function Bird(
  dateSighted,
  flockSize,
  habitat,
  appearance,
  vocalisations,
  species_id
) {
  this.dateSighted = dateSighted;
  this.flockSize = flockSize;
  this.habitat = habitat;
  this.appearance = appearance;
  this.vocalisations = vocalisations;
  this.species_id = species_id;

  // initialise a new Bird object with - new Bird("dateSighted", ...), access with b.habitat
}

export const getBirdById = (req, resp) => {
  const birdId = req.params.id;
  const dataInput = [birdId];

  // cannot use inner join because no data if comments not found in note
  const query = `
  SELECT *,
  to_char( date_sighted , 'YYYY-MM-DD') as formatted_date
  FROM ${birdTableName} WHERE id = $1;
  `;

  const whenDoneWithQuery = (err, res) => {
    if (err) {
      console.log("[DB] Error executing query: ", err.stack);
      resp.status(503).send(res.rows);
      return;
    }

    const data = res.rows;
    const bird = data[0];
    console.log(bird);
    const values = [birdId];

    const commentQuery = `SELECT * from ${commentTableName} WHERE bird_id = $1;`;
    pool.query(commentQuery, values, (error, result) => {
      if (error) {
        console.log("[DB] Error executing query: ", error.stack);
        resp.status(503).send(result.rows);
        return;
      }

      const comments = result.rows;
      console.log(comments);

      const renderObj = { bird: bird, comments: comments };
      resp.render("bird", renderObj);
    });
  };

  pool.query(query, dataInput, whenDoneWithQuery);
};

export const getAllBirds = (req, resp) => {
  const query = `
  SELECT *,
  to_char( date_sighted , 'YYYY-MM-DD') as formatted_date
  FROM ${birdTableName};
  `;
  const dataInput = [];

  const whenDoneWithQuery = (err, res) => {
    if (err) {
      console.log("[DB] Error executing query: ", err.stack);
      resp.status(503).send(res.rows);
      return;
    }

    const data = res.rows;
    const renderObj = { birds: data };
    resp.render("home", renderObj);
  };

  pool.query(query, dataInput, whenDoneWithQuery);
};

// ========================================================
// BIRD CRUD
// ========================================================

export const postNewBird = (req, resp) => {
  const payload = req.body;
  const cookies = req.cookies;
  const userId = cookies ? cookies.userId : "";

  const behaviors = req.body.behaviors;
  console.log(behaviors);

  const bird = new Bird(
    payload.date_sighted,
    payload.flock_size,
    payload.habitat,
    payload.appearance,
    payload.vocalisations,
    payload.species_id
  );

  const birdQuery = `
  INSERT INTO ${birdTableName} 
  (date_sighted, flock_size, habitat, appearance, vocalisations, species_id, user_id, created_at, updated_at) 
  VALUES
  ($1, $2, $3, $4, $5, $6, $7, $8, $9)
  RETURNING id
  ;
  `;
  const timeNow = getEpochTimeNow();
  const dataInput = [
    bird.dateSighted,
    bird.flockSize,
    bird.habitat,
    bird.appearance,
    bird.vocalisations,
    bird.species_id,
    userId,
    timeNow,
    timeNow,
  ];

  pool.query(birdQuery, dataInput, (err, res) => {
    if (err) {
      console.log("[DB] Error executing query: ", err.stack);
      resp.status(503).send(res.rows);
      return;
    }
    let insertQueryCounter = 0;
    const d = res.rows[0];
    const birdId = d.id;
    console.log(birdId);
    const birdBehaviorQuery = `
    INSERT INTO ${birdBehaviorsTableName}
    (behavior, bird_id)
    VALUES
    ($1, $2);
    `;

    behaviors.forEach((b, idx) => {
      const values = [b, birdId];
      pool.query(birdBehaviorQuery, values, (error, result) => {
        if (error) {
          console.log("[DB] Error executing query: ", error.stack);
          resp.status(503).send(result.rows);
          return;
        }
      });

      insertQueryCounter += 1;
      if (insertQueryCounter === behaviors.length) {
        resp.redirect("/");
      }
    });
  });
};

export const getNewBird = (req, resp) => {
  // form drop down for bird species from species table
  const speciesQuery = `SELECT * FROM ${speciesTableName};`;
  const dataInput = [];
  pool.query(speciesQuery, dataInput, (err, res) => {
    if (err) {
      console.log("[DB] Error executing query: ", err.stack);
      resp.status(503).send(res.rows);
      return;
    }

    const species = res.rows;
    console.log(species);

    // multiselect form for behaviors
    const behaviorQuery = `SELECT * FROM ${behaviorsTableName};`;
    pool.query(behaviorQuery, (error, result) => {
      if (error) {
        console.log("[DB] Error executing query: ", error.stack);
        resp.status(503).send(result.rows);
        return;
      }

      const behaviors = result.rows;
      console.log(behaviors);

      const renderObj = {
        action: "Add",
        bird: null,
        birdId: null,
        species: species,
        behaviors: behaviors,
      };
      resp.render("form", renderObj);
    });
  });
};

export const getEditBird = (req, resp) => {
  const birdId = req.params.id;

  const query = `
  SELECT *,
  to_char( date_sighted , 'YYYY-MM-DD') as formatted_date
  FROM ${birdTableName} INNER JOIN ${birdBehaviorsTableName} ON birds.id =${birdBehaviorsTableName}.bird_id WHERE ${birdTableName}.id = $1;
  `;
  const dataInput = [birdId];

  const whenDoneWithQuery = (err, result) => {
    if (err) {
      console.log("[DB] Error executing query: ", err.stack);
      resp.status(503).send(result.rows);
      return;
    }
    const birds = result.rows;
    console.log(birds);
    const selectedBehaviors = birds.map((b) => b.behavior);
    console.log(selectedBehaviors);

    const speciesQuery = `SELECT * FROM ${speciesTableName};`;
    pool.query(speciesQuery, [], (err, res) => {
      if (err) {
        console.log("[DB] Error executing query: ", err.stack);
        resp.status(503).send(res.rows);
        return;
      }

      const species = res.rows;
      console.log(species);

      const behaviorQuery = `SELECT * from ${behaviorsTableName};`;
      pool.query(behaviorQuery, (bbErr, bbRes) => {
        if (bbErr) {
          console.log("[DB] Error executing query: ", err.stack);
          resp.status(503).send(res.rows);
          return;
        }

        const b = bbRes.rows;
        console.log(b);
        const renderObj = {
          action: "Edit",
          bird: birds[0],
          birdId: birdId,
          species: species,
          behaviors: b,
          selectedBehaviors: selectedBehaviors,
        };
        resp.render("form", renderObj);
      });
    });
  };

  pool.query(query, dataInput, whenDoneWithQuery);
};

export const editBird = (req, resp) => {
  const birdId = req.params.id;
  const cookies = req.cookies;
  const userId = cookies ? cookies.userId : 0;

  const payload = req.body;
  console.log(payload);
  const bird = new Bird(
    payload.date_sighted,
    payload.behavior,
    payload.flock_size,
    payload.habitat,
    payload.appearance,
    payload.vocalisations,
    payload.species_id
  );

  // console.log(bird);

  const timeNow = getEpochTimeNow();
  const dataInput = [
    birdId,
    bird.dateSighted,
    bird.behavior,
    bird.flockSize,
    bird.habitat,
    bird.appearance,
    bird.vocalisations,
    bird.species_id,
    timeNow, //updated_at
    userId,
  ];

  const query = `
  UPDATE ${birdTableName}
  SET date_sighted = $2,
      behavior = $3,
      flock_size = $4,
      habitat = $5, 
      appearance = $6,
      vocalisations = $7,
      species_id = $8,
      updated_at = $9
  WHERE birds.id IN (
    SELECT birds.id FROM ${birdTableName} where birds.user_id = $10 and birds.id = $1
  );
  `;

  const whenDoneWithQuery = (err, res) => {
    if (err) {
      console.log("[DB] Error executing query: ", err.stack);
      resp.status(503).send();
      return;
    }

    // const data = res.rows;
    // console.log(data)
    resp.redirect("/");
  };

  pool.query(query, dataInput, whenDoneWithQuery);
};

export const deleteBird = (req, resp) => {
  const birdId = req.params.id;
  const cookies = req.cookies;
  const userId = cookies ? cookies.userId : 0;

  const dataInput = [birdId, userId];
  const query = `
  DELETE FROM ${birdTableName}
  WHERE birds.id IN (
    SELECT birds.id FROM ${birdTableName} where birds.user_id = $2 AND birds.id = $1
  );
  `;

  const whenDoneWithQuery = (err, res) => {
    if (err) {
      console.log("[DB] Error executing query: ", err.stack);
      resp.status(503).send(res.rows);
      return;
    }

    const data = res.rows;
    // console.log(data)
    resp.redirect("/");
  };

  pool.query(query, dataInput, whenDoneWithQuery);
};

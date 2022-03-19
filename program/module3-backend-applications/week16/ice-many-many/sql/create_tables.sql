CREATE TABLE workouts
(
    id SERIAL PRIMARY KEY,
    name TEXT,
    date TEXT
);

CREATE TABLE exercise_workouts
(
    id SERIAL PRIMARY KEY,
    exercise_id INT,
    workout_id INT
);


CREATE TABLE exercises
(
    id SERIAL PRIMARY KEY,
    name TEXT
);


INSERT INTO exercises
    (name)
VALUES
    ('SQUAT'),
    ('JUMPINGJACK'),
    ('SITUP'),
    ('PUSHUP')
;

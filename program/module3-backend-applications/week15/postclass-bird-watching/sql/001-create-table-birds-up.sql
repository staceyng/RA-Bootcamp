CREATE TABLE birds
(
    id SERIAL PRIMARY key,
    date_sighted DATE NOT NULL DEFAULT CURRENT_DATE,
    behavior TEXT NOT NULL,
    flock_size INT NOT NULL,
    habitat TEXT ,
    appearance TEXT,
    vocalisations TEXT,
    created_at INT,
    updated_at INT
);
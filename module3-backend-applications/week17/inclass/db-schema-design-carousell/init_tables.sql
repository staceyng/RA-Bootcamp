CREATE DATABASE carousell;

CREATE TABLE users
(
    email VARCHAR NOT NULL PRIMARY KEY,
    password TEXT NOT NULL,
    id VARCHAR NOT NULL,
    user_image TEXT
);

CREATE TABLE listings
(
    id VARCHAR PRIMARY KEY,
    name TEXT NOT NULL,
    price FLOAT NOT NULL DEFAULT 0,
    description TEXT NOT NULL,
    available BOOLEAN,
    image_url TEXT,
    user_id VARCHAR
);

CREATE TABLE favorites
(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR NOT NULL,
    listing_id VARCHAR NOT NULL
)

CREATE TABLE artists
(
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE paintings
(
    id SERIAL PRIMARY KEY,
    name TEXT,
    artist_id INT,
    collection_id INT
);


CREATE TABLE collections
(
    id SERIAL PRIMARY KEY,
    name TEXT
);

INSERT INTO artists
    (name)
VALUES
    ('Hans Hofmann');

INSERT INTO collections
    (name)
VALUES
    ('New York School');

INSERT INTO paintings
    (name, artist_id, collection_id)
VALUES
    ('The Wind', 1, 1),
    ('The Gate', 1, 1),
    ('The Garden', 1, 1);

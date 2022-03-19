CREATE TABLE recipes
(
    id SERIAL PRIMARY KEY,
    label TEXT,
    category_id INT
);


CREATE TABLE categories
(
    id SERIAL PRIMARY KEY,
    name TEXT
);

INSERT INTO categories
    (name)
VALUES
    ('vegan'),
    ('noodles');

INSERT INTO recipes
    (label, category_id)
VALUES
    ('corn soup', 1),
    ('salad', 1),
    ('udon', 2),
    ('ban mian', 2)

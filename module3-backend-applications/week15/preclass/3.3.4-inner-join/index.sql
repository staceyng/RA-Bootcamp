CREATE TABLE recipes
(
    id SERIAL PRIMARY KEY,
    label TEXT,
    category_id INTEGER
);
CREATE TABLE categories
(
    id SERIAL PRIMARY KEY,
    name TEXT
);

INSERT INTO categories
    (name)
VALUES
    ('vegan');
INSERT INTO categories
    (name)
VALUES
    ('keto');
INSERT INTO categories
    (name)
VALUES
    ('nut free');

SELECT *
FROM categories;

INSERT INTO recipes
    (label, category_id)
VALUES
    ('Udon', 1);
INSERT INTO recipes
    (label, category_id)
VALUES
    ('Mee Pok', 2);
INSERT INTO recipes
    (label, category_id)
VALUES
    ('Pasta', 1);

SELECT recipes.id, recipes.label, recipes.category_id, categories.id, categories.name
FROM recipes
    INNER JOIN categories
    ON categories.id = recipes.category_id;


SELECT recipes.id, recipes.label, recipes.category_id AS recipe_category_id, categories.id AS category_id, categories.name
FROM recipes
    INNER JOIN categories
    ON categories.id = recipes.category_id;

SELECT recipes.id, recipes.label, recipes.category_id AS recipe_category_id, categories.id AS category_id, categories.name
FROM recipes
    INNER JOIN categories
    ON categories.id = recipes.category_id
WHERE category_id=1;
CREATE TABLE recipes
(
    id SERIAL PRIMARY KEY,
    label TEXT
);
CREATE TABLE categories
(
    id SERIAL PRIMARY KEY,
    name TEXT
);
CREATE TABLE recipe_categories
(
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER,
    category_id INTEGER
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

INSERT INTO recipes
    (label)
VALUES
    ('Udon');
INSERT INTO recipes
    (label)
VALUES
    ('Mee Pok');
INSERT INTO recipes
    (label)
VALUES
    ('Pasta');

SELECT *
FROM categories;
SELECT *
FROM recipes;

INSERT INTO recipe_categories
    (recipe_id, category_id)
VALUES
    (1, 1);
INSERT INTO recipe_categories
    (recipe_id, category_id)
VALUES
    (1, 2);
INSERT INTO recipe_categories
    (recipe_id, category_id)
VALUES
    (2, 1);

SELECT *
FROM recipe_categories
WHERE category_id=1;


SELECT recipes.id, recipes.label, recipe_categories.category_id, recipe_categories.recipe_id
FROM recipes
    INNER JOIN recipe_categories
    ON recipe_categories.recipe_id = recipes.id
WHERE recipe_categories.category_id = 1;


SELECT *
FROM recipe_categories
WHERE recipe_id=1;

SELECT categories.id, categories.name, recipe_categories.category_id, recipe_categories.recipe_id
FROM categories
    INNER JOIN recipe_categories
    ON recipe_categories.category_id = categories.id
WHERE recipe_categories.recipe_id = 1;
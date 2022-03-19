CREATE TABLE behaviors
(
    behavior TEXT PRIMARY KEY
);

INSERT INTO behaviors
    (behavior)
VALUES
    ('walking'),
    ('bathing'),
    ('soaring'),
    ('resting'),
    ('hunting'),
    ('hovering'),
    ('ground feeding'),
    ('drinking');

CREATE TABLE bird_behaviors
(
    id SERIAL PRIMARY KEY,
    behavior TEXT
        REFERENCES behaviors
    (behavior),
    bird_id SMALLINT
);


INSERT INTO bird_behaviors
    (behavior, bird_id)
VALUES
    ('walking', 1),
    ('walking', 2),
    ('walking', 3),
    ('walking', 4),
    ('walking', 5),
    ('walking', 6),
    ('walking', 7),
    ('walking', 8);


ALTER TABLE birds
DROP COLUMN behavior;
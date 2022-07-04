CREATE TABLE comments
(
    id SERIAL PRIMARY KEY,
    comment TEXT,
    bird_id SMALLINT,
    user_id SMALLINT,
    created_at INT
);


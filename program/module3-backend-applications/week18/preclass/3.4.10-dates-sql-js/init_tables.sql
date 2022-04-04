create table dogs
(
    id serial primary key,
    name text not null,
    breed text not null,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

insert into dogs
    (
    name, breed
    )
values
    ('pepper', 'greyhound');
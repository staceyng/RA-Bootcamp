CREATE TABLE species
(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    scientific_name TEXT NOT NULL
)

INSERT INTO species
    (name, scientific_name)
VALUES
    ('King Quail', 'Excalfactoria chinensis' ),
    ('Red Junglefowl', 'Gallus gallus'),
    ('Grey Plover', 'Pluvialis squatarola'),
    ('Little Green Pigeon', 'Treron olax' ),
    ('Asian Koel', 'Eudynamys scolopaceus'),
    ('Common Swift', 'Apus apus'),
    ('Wood Sandpiper', 'Tringa glareola'),
    ('Brown-headed Gull', 'Chroicocephalus brunnicephalus' ),
    ('Western Osprey', 'Pandion haliaetus'),
    ('Coconut Lorikeet', 'Trichoglossus haematodus');


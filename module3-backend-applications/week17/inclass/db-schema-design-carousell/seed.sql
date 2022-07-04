INSERT INTO users
    (email, password, id)
VALUES
    ('user1@email.com', 'password1', 'b917e092e95545ddbd1ca47cbbc180de');

INSERT INTO listings
    (id, name, price, description, available, image_url, user_id)
VALUES
    ('15f03062e45b45e185c33bc0615df731', 'RK61 Mechanical Keyboard', 70, '60% mechanical keyboard with cherry mx red keys', TRUE, 'https://rkgamingstore.com/products/rk61-keyboard-white-red-switch', 'b917e092e95545ddbd1ca47cbbc180de'),
    ('a9f6b4470f0745ba95a5ad9d1e1937f2', 'HHKB Professional 2 Keyboard', 250, '60% mechanical keyboard with topre keys hhkb layout', TRUE, 'https://www.hhkeyboard.com/uk/products/pro2', 'b917e092e95545ddbd1ca47cbbc180de');

INSERT INTO favorites
    (user_id, listing_id)
VALUES
    ('b917e092e95545ddbd1ca47cbbc180de', '15f03062e45b45e185c33bc0615df731'),
    ('b917e092e95545ddbd1ca47cbbc180de', 'a9f6b4470f0745ba95a5ad9d1e1937f2');


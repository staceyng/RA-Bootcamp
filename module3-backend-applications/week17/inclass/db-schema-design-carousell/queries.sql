SELECT *
FROM listings;

SELECT *
FROM listings INNER JOIN favorites ON listings.id = favorites.listing_id
WHERE favorites.user_id = 'b917e092e95545ddbd1ca47cbbc180de';

UPDATE users SET user_image = 'https://en.wikipedia.org/wiki/Emoji' WHERE id = 'b917e092e95545ddbd1ca47cbbc180de';


UPDATE listings SET price = 63.70 WHERE id = '15f03062e45b45e185c33bc0615df731';
UPDATE listings SET available = FALSE WHERE id = '15f03062e45b45e185c33bc0615df731';
import express from 'express';

const app = express();
const router = express.Router();

const singleDiceRoll = () => Math.floor(Math.random() * 6 + 1);

router.get('/dice-roll/:number', (req, resp) => {
  console.log('Request URL:', req.originalUrl);
  const rolls = [];
  let n = parseInt(req.params.number, 10);
  if (n === 0) {
    n = 1;
  }

  for (let i = 0; i < n; i += 1) {
    rolls.push(singleDiceRoll());
  }

  resp.status(200).send(`Dice Roll Values: ${rolls}`);
});

app.use('/', router);
app.listen(3004);

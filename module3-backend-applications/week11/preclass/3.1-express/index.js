import express from 'express';

const app = express();

const singleDiceRoll = () => Math.floor(Math.random() * 6 + 1);

const handleSingleRoll = (request, response) => {
  const roll = singleDiceRoll();
  response.status(200).send(`Single Dice Roll: ${roll}`);
};

const handleDoubleRolls = (request, response) => {
  const rolls = [];
  const times = 2;

  for (let i = 0; i < times; i += 1) {
    rolls.push(singleDiceRoll());
  }
  console.log(rolls);

  response.status(200).send(`Double Dice Roll Values: ${rolls[0]}, ${rolls[1]}`);
};

app.get('/dice-roll', handleSingleRoll);
app.get('/two-dice-rolls', handleDoubleRolls);
app.listen(3004);

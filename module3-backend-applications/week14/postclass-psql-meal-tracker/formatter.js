function Meal(id, type, des, alchohol, wasHungry, createdAt) {
  this.id = id;
  this.type = type;
  this.description = des;
  this.amount_of_alchohol = alchohol;
  this.was_hungry_before_eating = wasHungry;
  this.created_at = Number(createdAt);
}

export const formatData = (data) => {
  let res = [];
  for (let i = 0; i < data.length; i++) {
    const meal = data[i];
    const m = new Meal(
      meal.id,
      meal.type,
      meal.description,
      meal.amount_of_alchohol,
      meal.was_hungry_before_eating,
      meal.created_at
    );
    res.push(m);
  }

  console.table(res); // this is cool omg - https://developer.mozilla.org/en-US/docs/Web/API/console/table
};

export const getEpochTimeNow = () => Math.floor(Date.now() / 1000);

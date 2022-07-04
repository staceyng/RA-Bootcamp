import express from 'express';
import { readFileSync } from 'fs';

const app = express();
const router = express.Router();

const readFile = (filepath, encoding) => {
  const file = readFileSync(filepath, encoding);
  return JSON.parse(file);
};

const namesHandler = (req, resp) => {
  console.log('Request URL:', req.originalUrl);
  const n = parseInt(req.params.index, 10);

  // read json file
  const data = readFile('./data.json', 'utf-8');
  console.log(data); // { names: [ 'Chee Kean', 'Susan Chan', 'Albert', 'Kai' ] }

  if (n > 0 && n < data.names.length) {
    resp.status(200).send(`name at index ${n} =  ${data.names[n]}`);
  } else {
    resp.status(404).send(`name at index ${n} cannot be found`);
  }
};

router.get('/names/:index', namesHandler);
app.use('/', router);
app.listen(3004);

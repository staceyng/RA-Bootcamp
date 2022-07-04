import express from 'express';
import { filename, readFile } from './jsonRead.js';

const app = express();
const router = express.Router();

const generateHTMLContent = (content, sortOrder) => {
  // content can be arr or obj -> put into result obj
  const contentCopy = JSON.parse(JSON.stringify(content));
  const allowedFields = ['YEAR', 'STATE'];
  let c;

  if (contentCopy.length) {
    // if it is an array, filter obj in arr
    c = contentCopy.map((s) => allowedFields.reduce((obj, key) => ({ ...obj, [key]: s[key] }), {}));
  } else {
    // this is an obj
    c = allowedFields.reduce((obj, key) => ({ ...obj, [key]: contentCopy[key] }), {});
    // console.log(c);
  }

  if (sortOrder) {
    c = c.filter((e) => e.STATE !== undefined);
    if (sortOrder === 'desc') {
      c.sort((a, b) => b.STATE.localeCompare(a.STATE));
    } else {
      c.sort((a, b) => a.STATE.localeCompare(b.STATE));
    }
  }

  return `
    <html>
      <body>
        <h1> Big Foot Sightings </h1>
        <pre id="json">${JSON.stringify(c, undefined, 2)}</pre>
      </body>
    </html>
  `;
};

const getSightingsByIndex = (req, resp) => {
  console.log('Request URL:', req.originalUrl);
  const n = parseInt(req.params.index, 10);

  // read json file
  const data = readFile(filename, 'utf-8');

  if (n >= 0 && n < data.sightings.length) {
    // generate html content for response
    const res = generateHTMLContent(data.sightings[n], null);
    resp.status(200).send(res);
  } else {
    resp.status(404).send(`sightings at index ${n} cannot be found`);
  }
};

const getSightingsByYear = (req, resp) => {
  console.log('Request URL:', req.originalUrl);
  // const y = parseInt(req.params.index, 10);
  const y = req.params.year; // path param

  const data = readFile(filename, 'utf-8');
  const yearData = data.sightings.filter((d) => d.YEAR === y);

  // console.log(yearData);
  if (yearData) {
    const res = generateHTMLContent(yearData, null);

    resp.status(200).send(res);
  } else {
    resp.status(200).send({ result: [] });
  }
};

const getAllSightings = (req, resp) => {
  console.log('Request URL:', req.originalUrl);
  const q = req.query; // query param
  let sort;
  const allowedSort = ['asc', 'desc'];

  if ('sort' in q) {
    if (allowedSort.includes(
      q.sort,
    )) {
      sort = q.sort;
    }
  }

  const data = readFile(filename, 'utf-8');
  if (data) {
    const res = generateHTMLContent(data.sightings, sort);
    resp.status(200).send(res);
  } else {
    resp.status(200).send({ result: [] });
  }
};

router.get('/sightings/:index', getSightingsByIndex);
router.get('/year-sightings/:year', getSightingsByYear);
router.get('/year-sightings', getAllSightings);
app.use('/', router);
app.listen(3004);

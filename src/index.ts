import express from 'express';
import db from './db/db.config';

const app = express();
const port = process.env.PORT || 4000;

app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM users');
    const rows = result.rows;
    console.log(rows);

    res.send({ users: rows, error: false });
  } catch (error) {
    console.log(error);
    res.send({ error: true });
  }
  // const result = await db.query('SELECT * FROM users');
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

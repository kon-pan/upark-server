import express from 'express';

const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send({ msg: 'Hello, World!' });
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

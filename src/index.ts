import express from 'express';
import cors from 'cors';
import driverRouter from './routes/driver/router.driver';

const app = express();
const port = process.env.PORT || 4000;

// MIDDLEWARES
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_HOSTNAME, credentials: true }));

// API ROUTING
app.use('/driver', driverRouter);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

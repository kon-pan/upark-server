import express from 'express';
import * as driverController from '../../controllers/driver/controller.driver';

const router = express.Router();

router.get('/get', driverController.getAllDrivers);
router.post('/register', driverController.registerDriver);

export default router;

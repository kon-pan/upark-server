import express from 'express';
import * as driverController from '../../controllers/driver/controller.driver';
import registerValidator from '../../util/validators/validator.register';

const router = express.Router();

router.get('/get', driverController.getAllDrivers);
router.post('/register', registerValidator, driverController.registerDriver);

export default router;

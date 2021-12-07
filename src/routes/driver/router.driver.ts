import express from 'express';
import passport from 'passport';
import * as driverController from '../../controllers/driver/controller.driver';
import registerValidator from '../../util/validators/validator.register';

const router = express.Router();

router.post('/login', passport.authenticate('local'), function (req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.send('success');
});
router.get('/get', driverController.getDriver);
router.post('/register', registerValidator, driverController.registerDriver);

export default router;

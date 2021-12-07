import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { DateTime } from 'luxon';
import { IDriver } from 'src/interfaces/interface.driver';
import Driver from '../../models/Driver';
import db from '../../db/db.config';

export const getDriver = async (req: Request, res: Response) => {
  console.log(req?.user);
  
  res.send(req.user);
};

export const registerDriver = async (req: Request, res: Response) => {
  console.log(req.body);
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);

  let response = {
    firstNameErr: '',
    lastNameErr: '',
    emailErr: '',
    passwordErr: '',
    passwordConfirmErr: '',
    registerSuccess: false,
  };

  if (!errors.isEmpty()) {
    for (const error of errors.array()) {
      switch (error.param) {
        case 'firstName':
          response.firstNameErr = error.msg;
          break;

        case 'lastName':
          response.lastNameErr = error.msg;
          break;

        case 'email':
          response.emailErr = error.msg;
          break;

        case 'password':
          response.passwordErr = error.msg;
          break;

        case 'passwordConfirm':
          response.passwordConfirmErr = error.msg;
          break;

        default:
          break;
      }
    }

    res.json(response);
  } else {
    // All input fields had valid values

    // Encrypt the password
    const passwordHash = await bcrypt.hash(req.body.password, 10);

    // Handle registration time
    const nowUtcIso = DateTime.now().toUTC().toISO();

    // Create the IDriver object
    const user: IDriver = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      displayName: `${req.body.firstName} ${req.body.lastName}`,
      email: req.body.email,
      password: passwordHash,
      phoneNumber: null,
      balance: 0,
      registeredOn: nowUtcIso,
      registeredWith: 'local',
      googleId: null,
    };

    // Save driver to the database
    const result = await Driver.save(user);

    if (result) {
      response.registerSuccess = true;
    }

    res.json(response);
  }
};

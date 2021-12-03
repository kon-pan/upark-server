import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { DateTime } from 'luxon';
import { IDriver } from 'src/interfaces/interface.driver';
import Driver from '../../models/Driver';
import db from '../../db/db.config';

export const getAllDrivers = async (req: Request, res: Response) => {
  try {
    const result = await db.query('SELECT * FROM users');
    const rows = result.rows;
    console.log(rows);

    res.send({ users: rows, error: false });
  } catch (error) {
    console.log(error);
    res.send({ error: true });
  }
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
    registerSucccess: false,
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

    // Create the IDatabaseUser object
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

    // Save user to the database
    const result = Driver.save(user);

    response.registerSucccess = true;
    res.json(response);
  }
};

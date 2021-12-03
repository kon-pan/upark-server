import capitalize from 'capitalize';
import { check } from 'express-validator';

import Driver from '../../models/Driver';

const registerValidator = [
  check('firstName')
    .trim()
    .stripLow()
    .not()
    .isEmpty()
    .withMessage('Εισάγετε τιμή σε αυτό το πεδίο.')
    .bail()
    .customSanitizer((value) => {
      let titleCased = value.toLowerCase();
      titleCased = titleCased.charAt(0).toUpperCase() + titleCased.slice(1);
      return titleCased;
    }),
  check('lastName')
    .trim()
    .stripLow()
    .not()
    .isEmpty()
    .withMessage('Εισάγετε τιμή σε αυτό το πεδίo.')
    .bail()
    .customSanitizer((value) => {
      let titleCased = value.toLowerCase();
      titleCased = titleCased.charAt(0).toUpperCase() + titleCased.slice(1);
      return titleCased;
    }),
  check('email')
    .isEmail()
    .trim()
    .withMessage('Εισάγετε μια σωστή διεύθυνση ηλ. ταχυδρομείου.')
    .bail()
    .custom((value) => {
      return new Promise(async (resolve, reject) => {
        const user = await Driver.findOne('email', value);
        //user object is empty
        if (Object.keys(user).length === 0 && user.constructor === Object) {
          resolve(true);
        } else {
          reject('Η διεύθυνση ηλ. ταχυδρομείου που εισάγατε χρησιμοποιείται.');
        }
      });
    }),
  check('password')
    .not()
    .isEmpty()
    .withMessage('Εισάγετε τιμή σε αυτό το πεδίo.')
    .bail()
    .isLength({ min: 8 })
    .withMessage(
      'Ο κωδικός σας πρέπει να αποτελείται τουλάχιστον απο 8 χαρακτήρες.'
    )
    .bail()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})|^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,}|)$/
    )
    .withMessage(
      'Ο κωδικός σας πρέπει να περιέχει τουλάχιστον 1 κεφαλαίο γράμμα, 1 μικρό γράμμα, 1 αριθμό και 1 ειδικό χαρακτήρα.'
    )
    .bail(),
  check('passwordConfirm')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error();
      }
      return true;
    })
    .withMessage(
      'Η τιμή που εισάγατε δεν αντιστοιχεί με τον κωδικό ασφαλείας.'
    ),
];

export default registerValidator;
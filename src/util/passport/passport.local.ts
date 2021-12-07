import passportLocal from 'passport-local';
import bcrypt from 'bcryptjs';
import Driver from '../../models/Driver';

const LocalStrategy = passportLocal.Strategy;

const localAuth = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async function (username, password, done) {
    try {
      console.log('--------------------------');
      console.log(username, password);
      const user = await Driver.findOne('email', username);

      // Check if the returned object is empty
      if (Object.keys(user).length === 0 && user.constructor === Object) {
        // Email doesn't match any database entry
        console.log(`Email doesn't match any database entry`);
        return done(null, false);
      } else {
        // Email matched a database entry
        console.log(`Email matched a database entry`);

        // Compare provided password with stored password
        const match = await bcrypt.compare(password, user.password); // true/false

        if (!match) {
          console.log(`Passwords don't match`);

          return done(null, false);
        }
        console.log(`Passwords match`);
        console.log('--------------------------');
        return done(null, user);
      }
    } catch (error) {
      return done(error);
    }
  }
);

export default localAuth;

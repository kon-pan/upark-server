import db from '../db/db.config';
import { IDriver, IPostgresDriver } from '../interfaces/interface.driver';

class Driver {
  /**
   * Saves a new user to the database
   * @param {IDatabaseUser} user - Streamlined object containing the user registration info
   * @returns {Promise<boolean>} - If user is succesfully entered to the database returns 1, else 0
   */
  static async save(user: IDriver): Promise<boolean> {
    const sql = `
    INSERT INTO drivers(
      first_name, last_name, display_name, email, password, phone_number, balance, registered_on, registered_with, google_id
    ) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `;

    try {
      const result = await db.query(sql, [
        user.firstName,
        user.lastName,
        user.displayName,
        user.email,
        user.password,
        user.phoneNumber,
        user.balance,
        user.registeredOn,
        user.registeredWith,
        user.googleId,
      ]);

      if (result.rowCount === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   *
   */
  static async findOne(
    col: string,
    value: string | number
  ): Promise<IPostgresDriver> {
    switch (col) {
      case 'email':
        try {
          const result = await db.query(
            'SELECT * FROM drivers WHERE email=$1',
            [value]
          );

          if (result.rowCount === 0) {
            return {} as IPostgresDriver; // email does not exist
          }

          const row: IPostgresDriver = result.rows[0];
          return row;
        } catch (error) {
          console.log(error);
        }

        break;

      case 'googleId':
        try {
          const result = await db.query(
            'SELECT * FROM drivers WHERE google_id=$1',
            [value]
          );

          if (result.rowCount === 0) {
            return {} as IPostgresDriver; // google id does not exist
          }

          const row: IPostgresDriver = result.rows[0];
          return row;
        } catch (error) {
          console.log(error);
        }

        break;
      case 'id':
        try {
          const result = await db.query('SELECT * FROM drivers WHERE id=$1', [
            value,
          ]);

          if (result.rowCount === 0) {
            return {} as IPostgresDriver; // google id does not exist
          }

          const row: IPostgresDriver = result.rows[0];
          return row;
        } catch (error) {
          console.log(error);
        }

        break;

      default:
        break;
    }
  }
}

export default Driver;

import { Request, Response } from 'express';
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
};

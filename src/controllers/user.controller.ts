import { NextFunction, Request, Response } from 'express';
import { findAllUsers } from '../services/user.service';

export const getMeHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};


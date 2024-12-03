import { NextFunction } from 'express';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import AuthServices from '@src/services/auth.services';
import UserServices from '@src/services/user.services';
import { IReq, IRes } from '@src/types/misc';
import * as UserTypes from '@src/types/user.types';

const getAllUsers = async (req: IReq, res: IRes, next: NextFunction) => {
  await AuthServices.protect('any')(req, next);

  const users = await UserServices.getAllUsers();

  return res.status(HttpStatusCodes.OK).json({
    status: 'success',
    success: true,
    data: users,
  });
};

const getUserById = async (req: IReq, res: IRes, next: NextFunction) => {
  await AuthServices.protect('internal')(req, next);

  const user = await UserServices.getUserById(req, next);

  return res.status(HttpStatusCodes.OK).json({
    status: 'success',
    success: true,
    data: user,
  });
};

const editUserById = async (req: IReq<UserTypes.IUserOptions>, res: IRes, next: NextFunction) => {
  const user = await UserServices.editUserById(req, next);

  return res.status(HttpStatusCodes.OK).json({
    status: 'success',
    success: true,
    data: user,
  });
};

const hardDeleteUserById = async (req: IReq, res: IRes, next: NextFunction) => {
  const message = await UserServices.hardDeleteUserById(req, next);

  return res.status(HttpStatusCodes.OK).json({
    status: 'success',
    success: true,
    data: message,
  });
};

const createCustomShift = async (req: IReq<UserTypes.ICreateCustomShiftRequest>, res: IRes, next: NextFunction) => {
  const message = await UserServices.createCustomShift(req, next);

  return res.status(HttpStatusCodes.OK).json({
    status: 'success',
    success: true,
    data: message,
  });
};

const deleteCustomShift = async (req: IReq, res: IRes, next: NextFunction) => {
  const message = await UserServices.deleteCustomShiftById(req, next);

  return res.status(HttpStatusCodes.OK).json({
    status: 'success',
    success: true,
    data: message,
  });
};

export default {
  createCustomShift,
  deleteCustomShift,
  editUserById,
  getAllUsers,
  getUserById,
  hardDeleteUserById,
} as const;

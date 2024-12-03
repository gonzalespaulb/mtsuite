import { NextFunction } from 'express';
import { Types } from 'mongoose';
import sanitize from 'sanitize-html';

import S3Services from './s3.services';
import UserSchemas from './schemas/user.schemas';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import User from '@src/models/user.model';
import { AppError } from '@src/other/classes';
import { IReq } from '@src/types/misc';
import * as UserTypes from '@src/types/user.types';
import SessionUtil from '@src/util/session.util';
import ValidatorHandlerUtil from '@src/util/validator-handler.util';

// **** Types **** //
interface IEditUserByIdReturn extends Omit<UserTypes.IUserOptions, 'phoneNumber' | 'photo'> {
  _id: Types.ObjectId;
  phoneNumber: number;
  photo: string;
}

// **** Functions **** //
const getAllUsers = async () => {
  const users = await User.find().select('-deletedAt').select('__v');

  for (let i = 0; i < users.length; i++) {
    const s3Url = await S3Services.s3Retrieve(users[i].employeePicture);

    users[i].employeePicture = s3Url;
  }

  return users;
};

const getUserById = async (req: IReq, next: NextFunction) => {
  const userId = req.params?.userId ? sanitize(req.params.userId) : 0;

  const user = await User.findById(userId);

  if (!user) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'Cannot find user!'));
  }

  const s3Url = await S3Services.s3Retrieve(user.employeePicture);

  user.employeePicture = s3Url;

  return user;
};

const editUserById = async (req: IReq<UserTypes.IUserOptions>, next: NextFunction): Promise<IEditUserByIdReturn> => {
  const userId = req.params?.userId ? sanitize(req.params.userId) : 0;

  const foundUser = await User.findOne({ employeeId: userId });

  if (!foundUser) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'Cannot find user!'));
  }

  const editValidation = ValidatorHandlerUtil(UserSchemas.editUserSchema);

  const validationData: Omit<UserTypes.IUserOptions, 'photo'> = {
    availableDays: req.body.availableDays,
    email: req.body.email,
    employeeId: req.body.employeeId,
    employeePosition: req.body.employeePosition,
    firstName: req.body.firstName,
    isActive: typeof req.body.isActive === 'string' ? JSON.parse(req.body.isActive) : req.body.isActive,
    lastName: req.body.lastName,
    mailingAddress: req.body.mailingAddress,
    performance: req.body.performance
      ? {
          absences: req.body.performance.absences ? +req.body.performance.absences : req.body.performance.absences,
          lates: req.body.performance.lates ? +req.body.performance.lates : req.body.performance.lates,
          ncns: req.body.performance.ncns ? +req.body.performance.ncns : req.body.performance.ncns,
          totalHours: req.body.performance.totalHours
            ? +req.body.performance.totalHours
            : req.body.performance.totalHours,
        }
      : req.body.performance,
    phoneNumber: !req.body.phoneNumber ? req.body.phoneNumber : `${req.body.phoneNumber}`,
    preferredName: req.body.preferredName,
    terrainLimit: req.body.terrainLimit ? +req.body.terrainLimit : req.body.terrainLimit,
  };

  const validatedData: Omit<UserTypes.IUserOptions, 'photo'> = editValidation.verify(validationData, next);

  const data: Omit<UserTypes.IUserOptions, 'photo'> & { employeePicture?: string } = {};

  if (typeof validatedData.isActive === 'boolean') {
    data.isActive = validatedData.isActive;
  }

  if (validatedData.availableDays && validatedData.availableDays.length) {
    validatedData.availableDays.forEach((available) => {
      sanitize(available);
    });

    data.availableDays = validatedData.availableDays;
  }

  if (validatedData.email) {
    data.email = sanitize(validatedData.email);
  }

  if (validatedData.employeeId) {
    data.employeeId = sanitize(validatedData.employeeId);
  }

  if (validatedData.firstName) {
    data.firstName = sanitize(validatedData.firstName);
  }

  if (validatedData.lastName) {
    data.lastName = sanitize(validatedData.lastName);
  }

  if (validatedData.mailingAddress) {
    data.mailingAddress = sanitize(validatedData.mailingAddress);
  }

  if (validatedData.performance) {
    data.performance = validatedData.performance;
  }

  if (validatedData.phoneNumber) {
    data.phoneNumber = sanitize(validatedData.phoneNumber);
  }

  if (validatedData.employeePosition) {
    data.employeePosition = validatedData.employeePosition;
  }

  if (validatedData.preferredName) {
    data.preferredName = sanitize(validatedData.preferredName);
  }

  if (typeof validatedData.terrainLimit !== 'undefined' && typeof validatedData.terrainLimit === 'number') {
    data.terrainLimit = validatedData.terrainLimit;
  }

  if (req.file) {
    const uploadedS3Photo = await S3Services.s3Upload(req, next);

    if (uploadedS3Photo.success) {
      await S3Services.s3Remove(foundUser.employeePicture);

      data.employeePicture = uploadedS3Photo.fileUrl;
    }
  }

  const updatedUser = await User.findByIdAndUpdate(foundUser._id, data, { new: true });

  if (!updatedUser) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'Cannot find user!'));
  }

  const s3Url = await S3Services.s3Retrieve(updatedUser.employeePicture);

  return {
    _id: updatedUser._id,
    availableDays: updatedUser.availableDays,
    email: updatedUser.email,
    employeeId: updatedUser.employeeId,
    firstName: updatedUser.firstName,
    isActive: updatedUser.isActive,
    lastName: updatedUser.lastName,
    mailingAddress: updatedUser.mailingAddress,
    performance: updatedUser.performance,
    phoneNumber: updatedUser.phoneNumber,
    photo: s3Url,
    employeePosition: updatedUser.employeePosition,
    preferredName: updatedUser.preferredName,
    terrainLimit: updatedUser.terrainLimit,
  };
};

const hardDeleteUserById = async (req: IReq, next: NextFunction) => {
  const userId = req.params?.userId ? sanitize(req.params.userId) : 0;

  const foundUser = await User.findOne({ employeeId: userId });

  if (!foundUser) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'Cannot find user!'));
  }

  const deletedUser = await User.findByIdAndDelete(foundUser._id);

  if (!deletedUser) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'Cannot delete user!'));
  }

  const deletedS3Photo = await S3Services.s3Remove(deletedUser.employeePicture);

  return deletedS3Photo
    ? `${deletedUser.firstName} ${deletedUser.lastName}'s employee profile has been deleted.`
    : `${deletedUser.firstName} ${deletedUser.lastName}'s employee profile has been deleted but could not remove photo from the cloud.`;
};

const createCustomShift = async (req: IReq<UserTypes.ICreateCustomShiftRequest>, next: NextFunction) => {
  const createValidation = ValidatorHandlerUtil(UserSchemas.createCustomShiftSchema);

  const clientToken = SessionUtil.headerToken(req);

  if (!clientToken) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'You are not logged in. Please login to get access.'));
  }

  const clientData = await SessionUtil.decodeToken(clientToken);

  if (!clientData) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'Please add a token for verification.'));
  }

  const clientUser = await User.findById(clientData.id);

  if (!clientUser) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'The user belonging to this token does not exit.'));
  }

  const reqData: UserTypes.ICreateCustomShiftRequest = {
    customShift: req.body.customShift,
    employeeId: req.params?.employeeId ? sanitize(req.params.employeeId) : '-1',
  };

  const validatedData: UserTypes.ICreateCustomShiftRequest = createValidation.verify(reqData, next);

  const newCustomShift = await User.findOneAndUpdate(
    { employeeId: validatedData.employeeId },
    { $push: { customShifts: validatedData.customShift } },
    { new: true }
  );

  if (!newCustomShift) {
    throw next(
      new AppError(
        HttpStatusCodes.UNAUTHORIZED,
        'Cannot find employee to create custom shifts, or failed to create one.'
      )
    );
  }

  return `Successfully created custom shift on ${validatedData.customShift.date} for ${newCustomShift.preferredName}`;
};

const deleteCustomShiftById = async (req: IReq, next: NextFunction): Promise<string> => {
  const deleteValidation = ValidatorHandlerUtil(UserSchemas.deleteCustomShiftsSchema);

  const clientToken = SessionUtil.headerToken(req);

  if (!clientToken) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'You are not logged in. Please login to get access.'));
  }

  const clientData = await SessionUtil.decodeToken(clientToken);

  if (!clientData) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'Please add a token for verification.'));
  }

  const foundUser = await User.findById(clientData.id);

  if (!foundUser) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'The user belonging to this token does not exist.'));
  }

  const reqData: UserTypes.IDeleteCustomShiftsRequest = {
    customShiftId: req.params?.customShiftId ? sanitize(req.params.customShiftId) : '-1',
    employeeId: req.params?.employeeId,
  };

  const validatedData: UserTypes.IDeleteCustomShiftsRequest = deleteValidation.verify(reqData, next);

  const deletedData = await User.findOneAndUpdate(
    { employeeId: validatedData.employeeId },
    { $pull: { customShifts: { _id: validatedData.customShiftId } } }
  );

  if (!deletedData) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'Cannot delete custom shift.'));
  }

  return `Successfully deleted custom shift for employee ${deletedData.preferredName}.`;
};

export default {
  createCustomShift,
  deleteCustomShiftById,
  editUserById,
  getAllUsers,
  getUserById,
  hardDeleteUserById,
} as const;

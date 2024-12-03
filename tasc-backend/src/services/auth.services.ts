import { NextFunction } from 'express';
import { Types } from 'mongoose';
import sanitize from 'sanitize-html';
import crypto from 'crypto';

import EmailServices from './email.services';
import S3Services from './s3.services';
import AuthSchemas from './schemas/auth.schemas';
import Environment from '@src/constants/environment';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import User from '@src/models/user.model';
import { AppError } from '@src/other/classes';
import * as AuthTypes from '@src/types/auth.types';
import { IReq, TRoleType, TPosition } from '@src/types/misc';
import SessionUtil from '@src/util/session.util';
import uniqueCodeGenerator from '@src/util/unique-code-generator.util';
import ValidatorHandlerUtil from '@src/util/validator-handler.util';

// **** Types **** //
interface ILoginData {
  id: Types.ObjectId;
  employeeId: string;
  employeePosition: TPosition;
  roleType: TRoleType;
}

// **** Functions **** //
const protect =
  (roleType: TRoleType | undefined = 'any') =>
  async (req: IReq<any>, next: NextFunction) => {
    const clientToken = SessionUtil.headerToken(req);

    if (!clientToken) {
      throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'You are not logged in. Please login to get access.'));
    }

    // const serverData = await SessionUtil.getSessionData(req);
    const clientData = await SessionUtil.decodeToken(clientToken);

    // if (!serverData || !clientData) {
    if (!clientData) {
      throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'Please add a token for verification.'));
    }

    // if (serverData.id !== clientData.id) {
    //   throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'Token does not match with the server. Please login.'));
    // }

    const found = await User.findById(clientData.id);

    if (!found) {
      throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'The user belonging to this token does not exist.'));
    }

    if (roleType && roleType !== 'any') {
      if (roleType !== clientData.roleType) {
        throw next(new AppError(HttpStatusCodes.FORBIDDEN, 'You do not have permission to perform this action.'));
      }
    }
  };

const checkIfLoggedIn = (req: IReq<AuthTypes.ILogin | AuthTypes.IOnboarding>, next: NextFunction) => {
  const token = req.signedCookies[Environment.CookieProps.Key];

  if (token || req.headers.authorization?.startsWith('Bearer')) {
    throw next(new AppError(HttpStatusCodes.FORBIDDEN, 'You are still logged in!'));
  }
};

const login = async (req: IReq<AuthTypes.ILogin>, next: NextFunction): Promise<ILoginData> => {
  const loginValidation = ValidatorHandlerUtil(AuthSchemas.loginSchema);
  const { email, password } = loginValidation.verify(req.body, next);

  const user = await User.findOne({ email: sanitize(email) }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'Incorrect email or password!'));
  }

  return {
    id: user._id,
    employeeId: user.employeeId,
    employeePosition: user.employeePosition,
    roleType: user.roleType,
  };
};

const admin = async (req: IReq<AuthTypes.IAdmin>, next: NextFunction): Promise<Pick<AuthTypes.IAdmin, 'email'>> => {
  const adminValidation = ValidatorHandlerUtil(AuthSchemas.adminSchema);
  const { email, employeePosition, firstName, lastName, password, photo, preferredName }: AuthTypes.IAdmin =
    adminValidation.verify(req.body, next);

  const data: Omit<AuthTypes.IAdmin, 'passwordConfirmation'> = {
    email: sanitize(email),
    employeePosition: sanitize(employeePosition),
    firstName: sanitize(firstName),
    lastName: sanitize(lastName),
    password: sanitize(password),
  };

  if (preferredName) {
    data.preferredName = preferredName;
  }

  const emailExists = await User.findOne({ email: data.email });

  if (emailExists) {
    throw next(new AppError(HttpStatusCodes.FORBIDDEN, 'Email already in use!'));
  }

  const user = await User.create(data);

  return { email: user.email };
};

const onboarding = async (
  req: IReq<AuthTypes.IOnboarding>,
  next: NextFunction
): Promise<Pick<AuthTypes.IOnboarding, 'email' | 'firstName' | 'lastName'> & { emailSent: boolean }> => {
  const signupValidation = ValidatorHandlerUtil(AuthSchemas.onboardingSchema);

  const validationData: Omit<AuthTypes.IOnboarding, 'photo'> = {
    availableDays: req.body.availableDays,
    email: req.body.email,
    employeeId: req.body.employeeId,
    employeePosition: req.body.employeePosition,
    firstName: req.body.firstName,
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
    phoneNumber: req.body.phoneNumber,
    preferredName: req.body.preferredName,
    terrainLimit: req.body.terrainLimit ? +req.body.terrainLimit : req.body.terrainLimit,
  };

  const {
    availableDays,
    email,
    employeeId,
    employeePosition,
    firstName,
    lastName,
    mailingAddress,
    performance,
    phoneNumber,
    preferredName,
    terrainLimit,
  }: Omit<AuthTypes.IOnboarding, 'photo'> = signupValidation.verify(validationData, next);

  const s3Data = await S3Services.s3Upload(req, next);

  const data: Omit<AuthTypes.IOnboarding, 'photo'> & { employeePicture: string } = {
    email: sanitize(email),
    employeeId: sanitize(employeeId),
    firstName: sanitize(firstName),
    lastName: sanitize(lastName),
    mailingAddress: sanitize(mailingAddress),
    phoneNumber: sanitize(phoneNumber),
    employeePicture: s3Data.fileUrl,
  };

  if (availableDays && availableDays.length) {
    availableDays.forEach((available) => {
      sanitize(available);
    });

    data.availableDays = availableDays;
  }

  if (performance) {
    data.performance = performance;
  }

  if (employeePosition) {
    data.employeePosition = sanitize(employeePosition);
  }

  if (preferredName) {
    data.preferredName = sanitize(preferredName);
  }

  if (typeof terrainLimit !== 'undefined' && typeof terrainLimit === 'number') {
    data.terrainLimit = terrainLimit;
  }

  const emailExists = await User.findOne({ email: data.email });

  if (emailExists) {
    throw next(new AppError(HttpStatusCodes.FORBIDDEN, 'Email already in use!'));
  }

  const employeeIdExists = await User.findOne({ employeeId: data.employeeId });

  if (employeeIdExists) {
    throw next(new AppError(HttpStatusCodes.FORBIDDEN, 'Employee ID already in use!'));
  }

  const uniqueCode = uniqueCodeGenerator(10);

  const user = await User.create({
    ...data,
    uniqueCode,
  });

  const expMin = 60;

  const resetToken = user.createPasswordResetToken(expMin);
  await user.save({ validateBeforeSave: false });

  const emailSent = await EmailServices.resetPassword(
    uniqueCode,
    user.email,
    'Reset Password - mtsüite',
    `https://mtsuite.io/onboard?token=${resetToken}`,
    `${expMin} minutes`
  );

  if (!emailSent) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
  }

  return { email: user.email, firstName: user.firstName, lastName: user.lastName, emailSent };
};

const resetPassword = async (req: IReq<AuthTypes.IResetPassword>, next: NextFunction) => {
  const resetPasswordValidation = ValidatorHandlerUtil(AuthSchemas.resetPasswordSchema);

  const validatedData: AuthTypes.IResetPassword = resetPasswordValidation.verify(req.body, next);

  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params?.token ?? -1)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  }).select('+uniqueCode');

  if (!user) {
    throw next(new AppError(HttpStatusCodes.BAD_REQUEST, 'Token is either invalid or expired.'));
  }

  if (user.uniqueCode !== validatedData.uniqueCode) {
    throw next(new AppError(HttpStatusCodes.BAD_REQUEST, 'Invalid unique code.'));
  }

  user.password = validatedData.password;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;
  user.uniqueCode = undefined;
  user.save();
};

const resendResetPassword = async (req: IReq, next: NextFunction): Promise<{ email: string }> => {
  const employeeId = req.params?.employeeId ? sanitize(req.params?.employeeId) : -1;

  const user = await User.findOne({ employeeId }).select('+uniqueCode');

  if (!user) {
    throw next(new AppError(HttpStatusCodes.NOT_FOUND, 'Cannot find user.'));
  }

  const uniqueCode = uniqueCodeGenerator(10);

  const validLength = 60;

  user.uniqueCode = uniqueCode;
  const resetToken = user.createPasswordResetToken(validLength);
  await user.save({ validateBeforeSave: false });

  const emailSent = await EmailServices.resetPassword(
    uniqueCode,
    user.email,
    'Reset Password - mtsüite',
    `https://mtsuite.io/onboard?token=${resetToken}`,
    `${validLength} minutes`
  );

  if (!emailSent) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
  }

  return { email: user.email };
};

const forgotPassword = async (
  req: IReq<AuthTypes.IForgotPassword>,
  next: NextFunction
): Promise<{ email: string; emailSent: boolean }> => {
  const validator = ValidatorHandlerUtil(AuthSchemas.forgotPasswordSchema);

  const validatedData: AuthTypes.IForgotPassword = validator.verify(req.body, next);

  const user = await User.findOne({ email: validatedData.email }).select('+uniqueCode');

  if (!user) {
    throw next(new AppError(HttpStatusCodes.NOT_FOUND, 'Cannot find user.'));
  }

  const uniqueCode = uniqueCodeGenerator(10);

  const validLength = 60;

  user.uniqueCode = uniqueCode;
  const resetToken = user.createPasswordResetToken(validLength);
  await user.save({ validateBeforeSave: false });

  const emailSent = await EmailServices.forgotPassword(
    uniqueCode,
    user.email,
    'Forgot Password - mtsüite',
    `https://mtsuite.io/onboard?token=${resetToken}`,
    `${validLength} minutes`
  );

  if (!emailSent) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    throw next(new AppError(HttpStatusCodes.INTERNAL_SERVER_ERROR, 'Could not sent email.'));
  }

  return { email: user.email, emailSent };
};

export default {
  admin,
  checkIfLoggedIn,
  login,
  onboarding,
  resetPassword,
  resendResetPassword,
  protect,
  forgotPassword,
} as const;

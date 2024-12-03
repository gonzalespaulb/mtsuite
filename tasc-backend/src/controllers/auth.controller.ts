import { NextFunction } from 'express';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import AuthServices from '@src/services/auth.services';
import * as AuthTypes from '@src/types/auth.types';
import { IReq, IRes } from '@src/types/misc';
import SessionUtil from '@src/util/session.util';

const login = async (req: IReq<AuthTypes.ILogin>, res: IRes, next: NextFunction) => {
  const user = await AuthServices.login(req, next);

  const token = await SessionUtil.addSessionToken(res, {
    id: user.id.toString(),
    employeeId: user.employeeId,
    employeePosition: user.employeePosition,
    roleType: user.roleType,
  });

  return res.status(HttpStatusCodes.CREATED).json({
    status: 'success',
    success: true,
    token,
    data: 'Login successful!',
  });
};

const logout = (_: IReq, res: IRes) => {
  SessionUtil.clearCookie(res);
  return res.status(HttpStatusCodes.OK).json({
    status: 'success',
    success: true,
    data: 'Logout successful!',
  });
};

const admin = async (req: IReq<AuthTypes.IAdmin>, res: IRes, next: NextFunction) => {
  const data = await AuthServices.admin(req, next);

  return res.status(HttpStatusCodes.CREATED).json({
    status: 'success',
    success: true,
    data: `Successfully entered ${data.email} into the system!`,
  });
};

const onboarding = async (req: IReq<AuthTypes.IOnboarding>, res: IRes, next: NextFunction) => {
  await AuthServices.protect('internal')(req, next);

  const data = await AuthServices.onboarding(req, next);

  const emailSentInfo = data.emailSent
    ? `and a reset password email has been sent to ${data.email}`
    : 'but could not send a reset password email';

  return res.status(HttpStatusCodes.CREATED).json({
    status: 'success',
    success: true,
    data: `Employee profile for ${data.firstName} ${data.lastName} has been created, ${emailSentInfo}.`,
  });
};

const resetPassword = async (req: IReq<AuthTypes.IResetPassword>, res: IRes, next: NextFunction) => {
  await AuthServices.resetPassword(req, next);

  return res.status(HttpStatusCodes.CREATED).json({
    status: 'success',
    success: true,
    data: 'Successfully reset your password.',
  });
};

const resendResetPassword = async (req: IReq, res: IRes, next: NextFunction) => {
  await AuthServices.protect('internal')(req, next);

  const { email } = await AuthServices.resendResetPassword(req, next);

  return res.status(HttpStatusCodes.CREATED).json({
    status: 'success',
    success: true,
    data: `Resent the reset password email to ${email}.`,
  });
};

const forgotPassword = async (req: IReq<AuthTypes.IForgotPassword>, res: IRes, next: NextFunction) => {
  const { email, emailSent } = await AuthServices.forgotPassword(req, next);

  return res.status(HttpStatusCodes.CREATED).json({
    status: 'success',
    success: true,
    data: !emailSent ? `Could not send email reset password to ${email}.` : `A reset link has been sent to ${email}.`,
  });
};

export default { admin, login, logout, onboarding, resetPassword, resendResetPassword, forgotPassword } as const;

import express from 'express';

import AuthController from '@src/controllers/auth.controller';
import MulterServices from '@src/services/multer.services';
import AsyncHandlerUtil from '@src/util/async-handler.util';

const router = express.Router();

router.post('/login', AsyncHandlerUtil(AuthController.login));
router.get('/logout', AuthController.logout);
router.post('/admin', AsyncHandlerUtil(AuthController.admin));
router.post(
  '/onboarding',
  (req, res, next) => MulterServices.singleFileUpload('employeePicture')(req, res, next),
  AsyncHandlerUtil(AuthController.onboarding)
);
router.patch('/reset-password/:token', AsyncHandlerUtil(AuthController.resetPassword));
router.get('/resend-reset-password/:employeeId', AsyncHandlerUtil(AuthController.resendResetPassword));
router.patch('/forgot-password', AsyncHandlerUtil(AuthController.forgotPassword));

export default router;

import express from 'express';

import UserController from '@src/controllers/user.controller';
import AsyncHandlerUtil from '@src/util/async-handler.util';
import MulterServices from '@src/services/multer.services';

const router = express.Router();

router.get('/', AsyncHandlerUtil(UserController.getAllUsers));
router.get('/:userId', AsyncHandlerUtil(UserController.getUserById));
router.patch(
  '/:userId',
  (req, res, next) => MulterServices.singleFileUpload('employeePicture')(req, res, next),
  AsyncHandlerUtil(UserController.editUserById)
);
router.delete('/:userId', AsyncHandlerUtil(UserController.hardDeleteUserById));
router.patch('/:employeeId/createCustomShift', AsyncHandlerUtil(UserController.createCustomShift));
router.patch('/:employeeId/deleteCustomShift/:customShiftId', AsyncHandlerUtil(UserController.deleteCustomShift));

export default router;

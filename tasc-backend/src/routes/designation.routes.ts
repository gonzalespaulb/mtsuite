import express from 'express';

import DesignationController from '@src/controllers/designation.controller';
import AsyncHandlerUtil from '@src/util/async-handler.util';

const router = express.Router();

router.get('/', AsyncHandlerUtil(DesignationController.getAllDesignations));
router.post('/newDesignation', AsyncHandlerUtil(DesignationController.newDesignation));
router.patch('/editDesignation/:id', AsyncHandlerUtil(DesignationController.editDesignationById));

export default router;

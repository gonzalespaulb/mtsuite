import express from 'express';

import ScheduleController from '@src/controllers/schedule.controller';
import AsyncHandlerUtil from '@src/util/async-handler.util';

const router = express.Router();

router.get('/', AsyncHandlerUtil(ScheduleController.getAllSchedules));
router.post('/newSchedule', AsyncHandlerUtil(ScheduleController.newSchedules));
router.patch('/editSchedule/:id', AsyncHandlerUtil(ScheduleController.editScheduleById));
router.delete('/hardDelete/:id', AsyncHandlerUtil(ScheduleController.hardDeleteScheduleById));

export default router;

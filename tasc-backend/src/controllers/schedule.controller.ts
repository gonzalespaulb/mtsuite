import { NextFunction } from 'express';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import AuthServices from '@src/services/auth.services';
import ScheduleServices from '@src/services/schedule.services';
import { IReq, IRes } from '@src/types/misc';
import * as ScheduleTypes from '@src/types/schedule.types';

const getAllSchedules = async (_: IReq, res: IRes, __: NextFunction) => {
  const schedules = await ScheduleServices.getAllSchedules();

  return res.status(HttpStatusCodes.OK).json({
    status: 'success',
    success: true,
    data: schedules,
  });
};

const newSchedules = async (req: IReq<ScheduleTypes.INewScheduleReqData>, res: IRes, next: NextFunction) => {
  await AuthServices.protect('internal')(req, next);

  const data = await ScheduleServices.newSchedule(req, next);

  return res.status(HttpStatusCodes.CREATED).json({
    status: 'success',
    success: true,
    data: `The schedule for ${data.title} has been created.`,
  });
};

const editScheduleById = async (req: IReq<ScheduleTypes.IEditScheduleReq>, res: IRes, next: NextFunction) => {
  await AuthServices.protect('internal')(req, next);

  const data = await ScheduleServices.editScheduleById(req, next);

  return res.status(HttpStatusCodes.OK).json({
    status: 'success',
    success: true,
    data,
  });
};

const hardDeleteScheduleById = async (req: IReq, res: IRes, next: NextFunction) => {
  const message = await ScheduleServices.hardDeleteScheduleById(req, next);

  return res.status(HttpStatusCodes.OK).json({
    status: 'success',
    success: true,
    data: message,
  });
};

export default { getAllSchedules, newSchedules, editScheduleById, hardDeleteScheduleById } as const;

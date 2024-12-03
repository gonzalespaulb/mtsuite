import { NextFunction } from 'express';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import AuthServices from '@src/services/auth.services';
import DesignationServices from '@src/services/designation.services';
import { IReq, IRes } from '@src/types/misc';
import * as DesignationTypes from '@src/types/designation.types';

const getAllDesignations = async (req: IReq, res: IRes, next: NextFunction) => {
  await AuthServices.protect('internal')(req, next);

  const designations = await DesignationServices.getAllDesignations();

  return res.status(HttpStatusCodes.OK).json({
    status: 'success',
    success: true,
    data: designations,
  });
};

const newDesignation = async (req: IReq<DesignationTypes.INewDesignationReqData>, res: IRes, next: NextFunction) => {
  await AuthServices.protect('internal')(req, next);

  const data = await DesignationServices.newDesignation(req, next);

  return res.status(HttpStatusCodes.CREATED).json({
    status: 'success',
    success: true,
    data: `The designation for ${data.designation} has been created.`,
  });
};

const editDesignationById = async (
  req: IReq<Omit<DesignationTypes.IEditDesignation, 'idRouteParams'>>,
  res: IRes,
  next: NextFunction
) => {
  await AuthServices.protect('internal')(req, next);

  const data = await DesignationServices.editDesignationById(req, next);

  return res.status(HttpStatusCodes.OK).json({
    status: 'success',
    success: true,
    data,
  });
};

export default { getAllDesignations, newDesignation, editDesignationById } as const;

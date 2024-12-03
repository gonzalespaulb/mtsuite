import { NextFunction } from 'express';
import sanitize from 'sanitize-html';

import DesignationSchemas from './schemas/designation.schemas';
import Designation from '@src/models/designation.model';
import { IReq } from '@src/types/misc';
import * as DesignationTypes from '@src/types/designation.types';
import ValidatorHandlerUtil from '@src/util/validator-handler.util';
import { AppError } from '@src/other/classes';
import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import ErrorMessages from '@src/constants/ErrorMessages';

// **** Functions **** //
const getAllDesignations = async () => {
  const designations = await Designation.find().select('-__v');

  return designations;
};

const newDesignation = async (
  req: IReq<DesignationTypes.INewDesignationReqData>,
  next: NextFunction
): Promise<Pick<DesignationTypes.IDesignationResData, 'designation'>> => {
  const newDesignationValidation = ValidatorHandlerUtil(DesignationSchemas.createDesignationSchema);

  const incomingData: DesignationTypes.INewDesignationReqData = {
    designation: req.body.designation,
    startTimes: req.body.startTimes,
    locations: req.body.locations,
  };

  const validatedData: DesignationTypes.INewDesignationReqData = newDesignationValidation.verify(incomingData, next);

  const sanitizedData: DesignationTypes.INewDesignationReqData = {
    designation: sanitize(validatedData.designation),
    startTimes: validatedData.startTimes.map((val) => sanitize(val)),
    locations: req.body.locations,
  };

  const designationExist = await Designation.findOne({ designation: sanitizedData.designation });

  if (designationExist) {
    throw next(new AppError(HttpStatusCodes.FORBIDDEN, ErrorMessages.designationErrors.designation.exist));
  }

  const newDesignation = await Designation.create(sanitizedData);

  return { designation: newDesignation.designation };
};

const editDesignationById = async (
  req: IReq<Omit<DesignationTypes.IEditDesignation, 'idRouteParams'>>,
  next: NextFunction
): Promise<DesignationTypes.IEditDesignationRes> => {
  const editValidation = ValidatorHandlerUtil(DesignationSchemas.editDesignationSchema);

  const reqData: DesignationTypes.IEditDesignation = {
    ...req.body,
    idRouteParams: req.params?.id,
  };

  const validatedData: DesignationTypes.IEditDesignation = editValidation.verify(reqData, next);

  const found = await Designation.findById(validatedData.idRouteParams);

  if (!found) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'Cannot find designation.'));
  }

  const toUpdate: Omit<DesignationTypes.IEditDesignation, 'idRouteParams'> = {};

  if (validatedData.designation) {
    toUpdate.designation = validatedData.designation;
  }

  if (typeof validatedData.isActive === 'boolean') {
    toUpdate.isActive = validatedData.isActive;
  }

  if (validatedData.locations) {
    toUpdate.locations = validatedData.locations;
  }

  if (validatedData.startTimes) {
    toUpdate.startTimes = validatedData.startTimes;
  }

  const updated = await Designation.findByIdAndUpdate(validatedData.idRouteParams, toUpdate, { new: true });

  if (!updated) {
    throw next(new AppError(HttpStatusCodes.UNAUTHORIZED, 'Cannot find designation to update, or failed to update.'));
  }

  return {
    _id: updated.id,
    designation: updated.designation,
    isActive: updated.isActive,
    locations: updated.locations,
    startTimes: updated.startTimes,
  };
};

export default { getAllDesignations, newDesignation, editDesignationById } as const;

import { Types } from 'mongoose';

import { ICustomShift, IFile, TPosition } from './misc';

interface IUser {
  id: Types.ObjectId;
  availableDays?: string[] | null;
  createdAt: Date;
  customShifts: ICustomShift[];
  email: string;
  employeeId: string;
  employeePosition?: TPosition | null;
  firstName: string;
  isActive: boolean;
  lastName: string;
  mailingAddress: string;
  phoneNumber: string;
  preferredName?: string | null;
  terrainLimit?: string[] | null;
  updatedAt: Date;
}

interface IUserOptions {
  availableDays?: string[] | null;
  email?: string;
  employeeId?: string;
  employeePosition?: TPosition | null;
  firstName?: string;
  isActive?: boolean | string;
  lastName?: string;
  mailingAddress?: string;
  performance?: {
    absences?: number;
    lates?: number;
    ncns?: number;
    totalHours?: number;
  };
  phoneNumber?: string;
  photo?: IFile | null;
  preferredName?: string | null;
  terrainLimit?: number;
}

// CREATING CUSTOM SHIFTS
interface ICreateCustomShiftRequest extends Pick<IUser, 'employeeId'> {
  customShift: ICustomShift;
}

interface ICreateCustomShiftResponse extends Omit<IUser, 'id'> {
  _id: Types.ObjectId;
}

// DELETING CUSTOM SHIFTS
interface IDeleteCustomShiftsRequest extends Pick<IUser, 'employeeId'> {
  customShiftId: string;
}

export { ICreateCustomShiftRequest, ICreateCustomShiftResponse, IDeleteCustomShiftsRequest, IUser, IUserOptions };

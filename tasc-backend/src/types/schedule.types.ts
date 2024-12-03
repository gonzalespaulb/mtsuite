import { Types } from 'mongoose';

import * as MiscTypes from './misc';

interface IPunchTime {
  start: Date;
  end: Date;
  total: number;
}

interface IAssignedEmployee {
  employeeId: string;
  preferredName: string;
  position: MiscTypes.TPosition[];
  designation: string;
  location: string;
  startTime: string;
  punchTimes?: IPunchTime[] | [];
  totalHours?: number;
}

interface IPosition {
  position: MiscTypes.TPosition[];
  startTime: string;
}

interface ILocation {
  designation: string;
  positions: IPosition[];
  terrain: string;
}

interface IDesignation {
  designation: string;
  startTimes: string[];
  locations: ILocation[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

interface ICreatedBy {
  employeeId: string;
  employeePicture: string;
  preferredName: string;
}

interface IDraft {
  new: IAssignedEmployee[];
  reassigned: IAssignedEmployee[];
  removed: IAssignedEmployee[];
}

interface ISchedule {
  id: Types.ObjectId;
  title: string;
  date: string;
  designations: IDesignation[];
  assignedEmployees: IAssignedEmployee[];
  isDraft: boolean;
  draft?: IDraft | null;
  createdBy: ICreatedBy;
  createdAt: Date;
  updatedAt: Date;
}

interface INewScheduleReqData extends Omit<ISchedule, 'id' | 'createdAt' | 'updatedAt' | 'designations' | 'draft'> {
  designations: Omit<IDesignation, 'createdAt' | 'updatedAt'>[];
}

interface IScheduleResData extends Omit<ISchedule, 'id'> {
  _id: Types.ObjectId;
}

// **** EDITING **** //
interface IEditPunchTimeReq {
  start?: Date | null;
  end?: Date | null;
  total?: number | null;
}

interface IEditAssignedEmployeeReq {
  employeeId?: string | null;
  preferredName?: string | null;
  position?: MiscTypes.TPosition[] | null;
  designation?: string | null;
  location?: string | null;
  startTime?: string | null;
  punchTimes?: IEditPunchTimeReq[] | null;
  totalHours?: number | null;
}

interface IEditPositionReq {
  position?: MiscTypes.TPosition[] | null;
  startTime?: string | null;
}

interface IEditLocationReq {
  designation?: string | null;
  positions?: IEditPositionReq[] | null;
  terrain?: string | null;
}

interface IEditDesignationReq {
  designation?: string | null;
  startTimes?: string[] | null;
  locations?: IEditLocationReq[] | null;
  isActive?: boolean | null;
}

interface IEditScheduleReq {
  id: string | null;
  title?: string | null;
  date?: string | null;
  designations?: IEditDesignationReq[] | null;
  assignedEmployees?: IEditAssignedEmployeeReq[] | null;
  isDraft?: boolean | null;
}

interface IEditScheduleRes extends Omit<IEditScheduleReq, 'id'> {
  _id: Pick<ISchedule, 'id'>;
  createdBy: ICreatedBy;
}

// **** DELETING **** //
interface IDeleteScheduleReq {
  id: string;
}

export { ISchedule, INewScheduleReqData, IScheduleResData, IDeleteScheduleReq, IEditScheduleReq, IEditScheduleRes };

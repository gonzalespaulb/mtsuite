interface IResponse {
  status: string;
  success: boolean;
  error?: string;
}

type TPosition =
  | "Administrator"
  | "Attendant"
  | "Foreman"
  | "Manager"
  | "Operator"
  | "Relief"
  | "Supervisor"
  | "Superuser";

interface IPosition {
  position: TPosition[];
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
  isActive: boolean;
  locations: ILocation[];
  createdAt: Date;
  updatedAt: Date;
}

interface IAssignedEmployee {
  employeeId: string;
  preferredName: string;
  position: string[];
  designation: string;
  location: string;
  startTime: string;
}

interface ICreatedBy {
  employeeId: string;
  preferredName: string;
  employeePicture: string;
}

interface ISchedule {
  _id: string;
  title: string;
  date: string;
  designations: IDesignation[];
  assignedEmployees: IAssignedEmployee[];
  isDraft: boolean;
  createdBy: ICreatedBy;
  createdAt: Date;
  updatedAt: Date;
}

// GET ALL
export interface IGetAllScheduleResponse extends IResponse {
  data?: ISchedule[] | [];
}

// CREATE NEW
interface INewSchedule
  extends Omit<
    ISchedule,
    "_id" | "createdAt" | "updatedAt" | "designations" | "createdBy"
  > {
  designations: Omit<IDesignation, "createdAt" | "updatedAt">[];
}

export interface INewScheduleRequest {
  data: INewSchedule;
}

export interface INewScheduleResponse extends IResponse {
  data?: string;
}

// EDIT
interface IEditPosition {
  position?: TPosition[] | null;
  startTime?: string | null;
}

interface IEditLocation {
  designation?: string | null;
  positions?: IEditPosition[] | null;
  terrain?: string | null;
}

interface IEditDesignation {
  designation?: string | null;
  startTimes?: string[] | null;
  isActive?: boolean | null;
  locations?: IEditLocation[] | null;
}

interface IEditAssignedEmployee {
  employeeId?: string | null;
  preferredName?: string | null;
  position?: string[] | null;
  designation?: string | null;
  location?: string | null;
  startTime?: string | null;
}

interface IEditSchedule {
  title?: string | null;
  date?: string | null;
  designations?: IEditDesignation[] | null;
  assignedEmployees?: IEditAssignedEmployee[] | null;
  isDraft?: boolean | null;
}

export interface IEditScheduleRequest {
  scheduleId: string;
  data: IEditSchedule;
}

export interface IEditScheduleResponse extends IResponse {
  data?: ISchedule;
}

// DELETE
export interface IDeleteScheduleRequest {
  scheduleId: string;
}

export interface IDeleteScheduleResponse extends IResponse {
  data?: string;
}

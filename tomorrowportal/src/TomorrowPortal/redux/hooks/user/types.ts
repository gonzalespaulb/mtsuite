type TPosition =
  | "Administrator"
  | "Attendant"
  | "Foreman"
  | "Manager"
  | "Operator"
  | "Relief"
  | "Supervisor"
  | "Superuser";

export interface ICustomShift {
  id: string;
  _id: string;
  date: string;
  isActive: boolean;
  note: string;
}

interface IResponse {
  status: string;
  success: boolean;
  error?: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  preferredName: string;
  employeePosition: TPosition;
  employeeId: string;
  email: string;
  mailingAddress: string;
  phoneNumber: string;
  terrainLimit: string[];
  availableDays: string[];
  employeePicture: string;
  isActive?: boolean;
  customShifts: ICustomShift[];
}

export interface IGetAllUserResponse extends IResponse {
  data?: IUser[] | [];
}

// EDITING
export interface IEditUser {
  firstName?: string | null;
  lastName?: string | null;
  preferredName?: string | null;
  employeePosition?: TPosition | null | string;
  employeeId?: string | null;
  email?: string | null;
  mailingAddress?: string | null;
  phoneNumber?: string | null;
  terrainLimit?: number | null;
  availableDays?: string[] | null;
  employeePicture?: any | null;
  isActive?: boolean | null;
}

export interface IEditUserRequest {
  userId: string;
  data: IEditUser;
}

export interface IEditUserResponse extends IResponse {
  data?: IEditUser;
}

// DELETING
export interface IDeleteUserRequest {
  userId: string;
}

export interface IDeleteUserResponse extends IResponse {
  data?: string;
}

export interface ICreateCustomShiftRequest {
  employeeId: string;
  data: Omit<ICustomShift, "id" | "_id">;
}

export interface ICreateCustomShiftResponse extends IResponse {
  data?: string;
}

export interface IDeleteCustomShiftRequest {
  employeeId: string;
  customShiftId: string;
}

export interface IDeleteCustomShiftResponse extends IResponse {
  data?: string;
}

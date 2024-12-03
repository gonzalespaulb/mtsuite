import * as e from 'express';

// **** JWT **** //
interface IDecodedJWT {
  id: string;
  employeeId: string;
  employeePosition: TPosition;
  roleType: TRoleType;
}

// **** Express **** //
interface IReq<T = void> extends e.Request {
  body: T;
}

interface IRes extends e.Response {}

interface IFile extends Express.Multer.File {}

// **** Global **** //
type TPosition =
  | 'Administrator'
  | 'Attendant'
  | 'Foreman'
  | 'Manager'
  | 'Operator'
  | 'Relief'
  | 'Supervisor'
  | 'Superuser';

type TLocation = string;

type TRoleType = 'internal' | 'external' | 'any';

interface ICustomShift {
  date: string;
  isActive: boolean;
  note?: string;
}

export { ICustomShift, IFile, IReq, IRes, TLocation, TPosition, IDecodedJWT, TRoleType };

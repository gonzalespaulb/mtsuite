import { Types } from 'mongoose';

import { TLocation, TPosition } from './misc';

interface IPosition {
  position: TPosition[];
  startTime: string;
}

interface ILocation {
  designation: TLocation;
  positions: IPosition[];
  terrain: string;
}

interface IDesignation {
  id: Types.ObjectId;
  createdAt: Date;
  designation: string;
  startTimes: string[];
  locations: ILocation[];
  updatedAt: Date;
  isActive?: boolean;
}

interface INewDesignationReqData extends Omit<IDesignation, 'id' | 'createdAt' | 'updatedAt' | 'isActive'> {}

// **** EDITING/OPTIONS **** //
interface IEditPosition {
  position?: TPosition[] | null;
  startTime?: string | null;
}

interface IEditLocation {
  designation?: TLocation | null;
  positions?: IEditPosition[] | null;
  terrain?: string | null;
}

interface IEditDesignation {
  idRouteParams: string;
  designation?: string | null;
  startTimes?: string[] | null;
  isActive?: boolean | null;
  locations?: IEditLocation[] | null;
}

// **** RESPONSES **** //
interface IDesignationResData extends Omit<IDesignation, 'id'> {
  _id: Types.ObjectId;
}

interface IEditDesignationRes extends Omit<IEditDesignation, 'idRouteParams'> {
  _id: Pick<IDesignation, 'id'>;
}

export { IDesignation, INewDesignationReqData, IDesignationResData, IEditDesignation, IEditDesignationRes };

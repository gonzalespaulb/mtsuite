type TPosition =
  | "Administrator"
  | "Attendant"
  | "Foreman"
  | "Manager"
  | "Operator"
  | "Relief"
  | "Supervisor"
  | "Superuser";

interface IResponse {
  status: string;
  success: boolean;
  error?: string;
}

interface IPosition {
  startTime: string;
  position: TPosition[];
}

interface ILocation {
  terrain: string;
  designation: string;
  positions: IPosition[];
}

interface IDesignation {
  designation: string;
  startTimes: string[];
  isActive: boolean;
  locations: ILocation[];
}

// GET ALL
export interface IGetAllDesignationResponse extends IResponse {
  data?: IDesignation[] | [];
}

// CREATE NEW
export interface INewDesignationRequest {
  data: IDesignation[];
}

export interface INewDesignationResponse extends IResponse {
  data?: string;
}

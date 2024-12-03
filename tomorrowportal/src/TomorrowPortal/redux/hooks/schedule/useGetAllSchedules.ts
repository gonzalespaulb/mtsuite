import { useGetAllSchedulesQuery } from "../../api/scheduleApi";
import { IGetAllScheduleResponse } from "./types";

// type TLocation = string;

// interface IAssignedEmployee {
//   employeeId: string;
//   preferredName: string;
//   position: string[];
//   designation: TLocation;
//   location: string;
//   startTime: string;
// }

// type TPosition =
//   | "Administrator"
//   | "Attendant"
//   | "Foreman"
//   | "Manager"
//   | "Operator"
//   | "Relief"
//   | "Supervisor"
//   | "Superuser";

// interface IPosition {
//   position: TPosition[];
//   startTime: string;
// }

// interface ILocation {
//   designation: string;
//   positions: IPosition[];
//   terrain: string;
// }

// interface IDesignation {
//   designation: string;
//   startTimes: string[];
//   isActive: boolean;
//   locations: ILocation[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// interface ISchedule {
//   _id: string;
//   title: string;
//   date: string;
//   designations: IDesignation[];
//   assignedEmployees: IAssignedEmployee[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// interface IGetAllScheduleRes {
//   status: string;
//   success: boolean;
//   error?: string;
//   data?: ISchedule[] | [];
// }

export type TGetAllSchedulesHook = () => {
  data?: IGetAllScheduleResponse;
  isLoading: boolean;
  isFetching: boolean;
};

export const useGetAllSchedules: TGetAllSchedulesHook = () => {
  const { data, isLoading, isFetching } = useGetAllSchedulesQuery();

  return { data, isLoading, isFetching };
};

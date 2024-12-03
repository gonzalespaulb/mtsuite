import { createApi } from "@reduxjs/toolkit/dist/query/react";
import customBaseQuery from "./customBaseQuery";
import { IGetAllScheduleResponse, INewScheduleRequest, INewScheduleResponse, IEditScheduleRequest, IEditScheduleResponse, IDeleteScheduleRequest, IDeleteScheduleResponse } from '../hooks/schedule/types';

// interface IAssignedEmployee {
//   employeeId: string;
//   preferredName: string;
//   position: string[];
//   designation: string;
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
//   // position: string[];
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

// interface INewScheduleRes {
//   status: string;
//   success: boolean;
//   error?: string;
//   data?: string;
// }

// interface INewScheduleReq extends Omit<ISchedule, '_id'|'createdAt'|'updatedAt'|'designations'> {
//   designations: Omit<IDesignation, 'createdAt'|'updatedAt'>[];
// }

// interface IEditSchedule {
//   title?: string;
//   date?: string;
//   designations?: IDesignation[];
//   assignedEmployees?: IAssignedEmployee[];
// }

// interface IEditScheduleReq {
//   scheduleId: string;
//   data: Omit<IEditSchedule, 'designations'> & {
//     designations: Omit<IDesignation, 'createdAt'|'updatedAt'>[];
//   };
// }

// interface IEditScheduleRes {
//   status: string;
//   success: boolean;
//   error?: string;
//   data?: ISchedule;
// }

// interface IDeleteScheduleRes {
//   status: string;
//   success: boolean;
//   error?: string;
//   data?: string;
// }

export const scheduleApi = createApi({
  reducerPath: 'scheduleApi',
  baseQuery: customBaseQuery,

  endpoints: builder => ({
    getAllSchedules: builder.query<IGetAllScheduleResponse, void>({
      query: () => '/schedules',
    }),

    newSchedule: builder.mutation<INewScheduleResponse, INewScheduleRequest>({
      query: ({data}) => ({
        url: '/schedules/newSchedule',
        method: 'POST',
        body: data,
      })
    }),

    editSchedule: builder.mutation<IEditScheduleResponse, IEditScheduleRequest>({
      query: ({scheduleId, data}) => ({
        url: `/schedules/editSchedule/${scheduleId}`,
        method: 'PATCH',
        body: data,
      })
    }),

    hardDeleteSchedule: builder.mutation<IDeleteScheduleResponse, IDeleteScheduleRequest>({
      query: ({scheduleId}) => ({
        url: `/schedules/hardDelete/${scheduleId}`,
        method: 'DELETE',
      })
    }),
  }),
});

export const { useGetAllSchedulesQuery, useEditScheduleMutation, useNewScheduleMutation, useHardDeleteScheduleMutation } = scheduleApi;

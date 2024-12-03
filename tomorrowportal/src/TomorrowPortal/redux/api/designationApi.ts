import { createApi } from '@reduxjs/toolkit/query/react';
import  customBaseQuery  from './customBaseQuery';
import { IGetAllDesignationResponse, INewDesignationRequest, INewDesignationResponse } from '../hooks/designation/types';

// NOTE --------------------------------------------------------------------------------------- INTERFACE

// type TPosition =
//   | "Administrator"
//   | "Attendant"
//   | "Foreman"
//   | "Manager"
//   | "Operator"
//   | "Relief"
//   | "Supervisor"
//   | "Superuser";

// interface IDesignation {
//   designation: string;
//   startTimes: string[];
//   isActive: boolean;
//   locations: { 
//     terrain: string;
//     designation: string;
//     positions: {
//       startTime: string;
//       position: TPosition[];
//     }[];
//   }[];
// }

// interface IDesignationResponse {
//   status: string;
//   success: boolean;
//   error?: string;
//   data?: IDesignation[] | [];
// }

// interface INewDesignationResponse {
//   status: string;
//   success: boolean;
//   error?: string;
//   data?: string;
// }

// interface INewDesignationRequest {
//   designation: string;
//   startTimes: string[];
//   locations: {
//     terrain: string;
//     designation: string;
//     positions: {
//       startTime: string;
//       position: TPosition[];
//     }[];
//   }[];
// }

// NOTE --------------------------------------------------------------------------------------- INTERFACE

export const designationApi = createApi({
  reducerPath: 'designationApi',
  baseQuery: customBaseQuery,

  endpoints: builder => ({
    getAllDesignations: builder.query<IGetAllDesignationResponse, void>({
      query: () => '/designations',
    }),

    newDesignation: builder.mutation<INewDesignationResponse, INewDesignationRequest>({
      query: ({data}) => {
        return {
        url: '/designations/newDesignation',
        method: 'POST',
        body: data,
      }},
    }),
  })
})

export const { useGetAllDesignationsQuery, useNewDesignationMutation } = designationApi;

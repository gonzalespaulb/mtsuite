import { QueryActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';
import { useGetAllEmployeesQuery } from '../../api/userApi';
import { QueryDefinition, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { IGetAllUserResponse } from './types';

// NOTE --------------------------------------------------------------------------------------- INTERFACE

// interface IUser {
//   firstName: any;
//   lastName: any;
//   preferredName: any;
//   employeePosition: any;
//   employeeId: any;
//   email: any;
//   mailingAddress: any;
//   phoneNumber: any;
//   terrainLimit: any;
//   availableDays: any[];
//   employeePicture: any;
//   isActive?: boolean;
// }

// interface IUserResponse {
//   status: string;
//   success: boolean;
//   error?: string;
//   data?: IUser[] | [];
// }
// NOTE --------------------------------------------------------------------------------------- INTERFACE
export type TUserEmployeeHook = () => {
  data?: IGetAllUserResponse;
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => QueryActionCreatorResult<QueryDefinition<void, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>, never, IGetAllUserResponse, "userApi">>
}

export const useEmployees: TUserEmployeeHook = () => {
  const {data, isLoading, refetch, isFetching} = useGetAllEmployeesQuery();

  return {data, isLoading, refetch, isFetching};
};
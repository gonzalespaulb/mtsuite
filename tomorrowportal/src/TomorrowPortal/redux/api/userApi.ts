import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";
import {
  IUser,
  IGetAllUserResponse,
  IEditUser,
  IEditUserRequest,
  IEditUserResponse,
  IDeleteUserRequest,
  IDeleteUserResponse,
  ICreateCustomShiftRequest,
  ICreateCustomShiftResponse,
  IDeleteCustomShiftRequest,
  IDeleteCustomShiftResponse,
} from "../hooks/user/types";

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

// interface IEditUserResponse {
//   status: string;
//   success: boolean;
//   error?: string;
//   data?: IUser;
// }

// interface IDeleteUserResponse {
//   status: string;
//   success: boolean;
//   error?: string;
//   data?: string;
// }

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: customBaseQuery,

  endpoints: (builder) => ({
    getAllEmployees: builder.query<IGetAllUserResponse, void>({
      query: () => "/users",
    }),

    editUserById: builder.mutation<IEditUserResponse, IEditUserRequest>({
      query: ({ userId, data }) => {
        // NOTE: ONLY USE FormData() when uploading actual files! WON'T WORK WITHOUT A FILE!
        let patchData: FormData | Omit<IEditUser, "employeePicture"> = {};

        if (data.employeePicture && data.employeePicture instanceof File) {
          const formData = new FormData();

          formData.append("employeePicture", data.employeePicture);

          if (data.availableDays && data.availableDays.length) {
            data.availableDays.forEach((day) => {
              formData.append("availableDays[]", day);
            });
          }

          if (data.firstName) {
            formData.append("firstName", data.firstName);
          }

          if (data.lastName) {
            formData.append("lastName", data.lastName);
          }

          if (data.preferredName) {
            formData.append("preferredName", data.preferredName);
          }

          if (data.employeePosition) {
            formData.append("employeePosition", data.employeePosition);
          }

          if (data.employeeId) {
            formData.append("employeeId", data.employeeId);
          }

          if (data.email) {
            formData.append("email", data.email);
          }

          if (data.mailingAddress) {
            formData.append("mailingAddress", data.mailingAddress);
          }

          if (typeof data.terrainLimit === "number") {
            formData.append("terrainLimit", JSON.stringify(data.terrainLimit));
          }

          if (data.phoneNumber) {
            formData.append("phoneNumber", data.phoneNumber);
          }

          if (data.isActive) {
            formData.append("isActive", JSON.stringify(data.isActive));
          }

          patchData = formData;
        } else {
          patchData.firstName = data.firstName;
          patchData.lastName = data.lastName;
          patchData.preferredName = data.preferredName;
          patchData.employeePosition = data.employeePosition;
          patchData.employeeId = data.employeeId;
          patchData.email = data.email;
          patchData.mailingAddress = data.mailingAddress;
          patchData.terrainLimit = data.terrainLimit;
          patchData.phoneNumber = data.phoneNumber;
          patchData.availableDays = data.availableDays;
          patchData.isActive = data.isActive;
        }

        return {
          url: `/users/${userId}`,
          method: "PATCH",
          body: patchData,
        };
      },
    }),

    deleteUserById: builder.mutation<IDeleteUserResponse, IDeleteUserRequest>({
      query: ({ userId }) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
    }),

    createCustomShift: builder.mutation<
      ICreateCustomShiftResponse,
      ICreateCustomShiftRequest
    >({
      query: ({ employeeId, data }) => ({
        url: `/users/${employeeId}/createCustomShift`,
        method: "PATCH",
        body: {
          customShift: data,
        },
      }),
    }),

    deleteCustomShift: builder.mutation<
      IDeleteCustomShiftResponse,
      IDeleteCustomShiftRequest
    >({
      query: ({ customShiftId, employeeId }) => ({
        url: `/users/${employeeId}/deleteCustomShift/${customShiftId}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useEditUserByIdMutation,
  useDeleteUserByIdMutation,
  useCreateCustomShiftMutation,
  useDeleteCustomShiftMutation,
} = userApi;

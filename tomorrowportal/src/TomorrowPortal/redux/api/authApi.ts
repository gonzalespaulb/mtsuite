import { createApi } from "@reduxjs/toolkit/query/react";
import customBaseQuery from "./customBaseQuery";
import {
  ILoginRequest,
  ILoginResponse,
  ILogoutResponse,
  IOnboardingRequest,
  IOnboardingResponse,
  IResetPasswordRequest,
  IResetPasswordResponse,
  IForgotPasswordRequest,
  IForgotPasswordResponse,
} from "../hooks/auth/types";

// NOTE --------------------------------------------------------------------------------------- INTERFACE

// interface ILoginRequest {
//   email: string;
//   password: string;
// }

// interface ILoginResponse {
//   status: string;
//   success: boolean;
//   error?: string;
//   token?: string;
//   data?: string;
// }

// interface ILogoutResponse {
//   status: string;
//   success: boolean;
//   error?: string;
//   data?: string;
// }

// interface IOnboardingResponse {
//   status: string;
//   success: boolean;
//   error?: string;
//   data?: string;
// }

// interface IAuthUser {
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

// interface IResetPasswordReq {
//   password: string;
//   uniqueCode: string;
//   token: string;
// }

// interface IResetPasswordRes {
//   status: string;
//   success: boolean;
//   error?: string;
//   data?: string;
// }

// NOTE --------------------------------------------------------------------------------------- INTERFACE

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customBaseQuery,

  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: ({ data }) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation<ILogoutResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),

    onboarding: builder.mutation<IOnboardingResponse, IOnboardingRequest>({
      query: ({ data }) => {
        const formData = new FormData();

        formData.append("employeePicture", data.employeePicture);

        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);

        formData.append("preferredName", data.preferredName);
        formData.append("employeePosition", data.employeePosition);

        formData.append("employeeId", data.employeeId);

        formData.append("email", data.email);
        formData.append("mailingAddress", data.mailingAddress);

        formData.append("terrainLimit", JSON.stringify(data.terrainLimit));

        formData.append("phoneNumber", data.phoneNumber);

        if (data.availableDays.length) {
          data.availableDays.forEach((day) => {
            formData.append("availableDays[]", day);
          });
        }

        return {
          url: "/auth/onboarding",
          method: "POST",
          body: formData,
        };
      },
    }),

    resetPassword: builder.mutation<
      IResetPasswordResponse,
      IResetPasswordRequest
    >({
      query: ({ data }) => ({
        // BELOW IS SENDING TO API ENDPOINT
        url: `/auth/reset-password/${data.token}`,
        method: "PATCH",
        body: {
          password: data.password,
          uniqueCode: data.uniqueCode,
        },
      }),
    }),

    forgotPassword: builder.mutation<
      IForgotPasswordResponse,
      IForgotPasswordRequest
    >({
      query: ({ data }) => ({
        url: `/auth/forgot-password`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useOnboardingMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
} = authApi;

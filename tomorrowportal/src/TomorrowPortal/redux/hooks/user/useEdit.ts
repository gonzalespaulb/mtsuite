import { useCallback } from "react";
import { useEditUserByIdMutation } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { addToast } from "../../NotificationSlice";
import { FAIL, SUCCESS } from "../../../utils/status";
import { IEditUserRequest, IEditUserResponse } from "./types";

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

// interface IEditUserResponse {
//   status: string;
//   success: boolean;
//   error?: string;
//   data?: IUser;
// }

// NOTE --------------------------------------------------------------------------------------- INTERFACE

export type TEditHook = () => {
  editUser: (data: IEditUserRequest['data'], userId: IEditUserRequest['userId']) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
};

export const useEdit: TEditHook = () => {
  const dispatch = useDispatch();

  const [handleEditById, { isLoading, isSuccess }] = useEditUserByIdMutation();

  const editUser = useCallback(
    async (data: IEditUserRequest['data'], userId: IEditUserRequest['userId']) => {
      try {
        console.log(data);
        const editedUser = await handleEditById({data, userId}).unwrap();

        const successMessage = {
          status: SUCCESS,
          message: `${editedUser.data?.firstName} ${editedUser.data?.lastName} has been edited!`,
        };

        dispatch(addToast(successMessage));
        
      } catch (err) {
        console.log(err);
        const e = err as {
          data: IEditUserResponse;
        };
        const failMessage = {
          status: FAIL,
          message: e?.data?.error ?? "",
        };
        dispatch(addToast(failMessage));

      }
    },
    [handleEditById, isLoading, isSuccess]
  );

  return { editUser, isLoading, isSuccess };
};

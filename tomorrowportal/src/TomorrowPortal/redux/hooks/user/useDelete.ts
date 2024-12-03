import { useCallback } from "react";
import { useDeleteUserByIdMutation } from "../../api/userApi";
import { setCurrentEmployee } from "../../../redux/ContentSlice";
import { employeeData } from "../../../utils/mockData";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ContentValues } from "../../../utils/enums";
import { addToast } from "../../NotificationSlice";
import { FAIL, SUCCESS } from "../../../utils/status";
import { IDeleteUserRequest, IDeleteUserResponse } from "./types";

// NOTE --------------------------------------------------------------------------------------- INTERFACE
// interface IDeleteUserResponse {
//   status: string;
//   success: boolean;
//   error?: string;
//   data?: string;
// }
// NOTE --------------------------------------------------------------------------------------- INTERFACE
export type TDeleteHook = () => {
  deleteUser: (userId: IDeleteUserRequest['userId']) => Promise<void>;
  isLoading: boolean;
};

export const useDelete: TDeleteHook = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const [deleteById, { isLoading }] = useDeleteUserByIdMutation();

  const deleteUser = useCallback(
    async (userId: IDeleteUserRequest['userId']) => {
      try {
        const deleteData = await deleteById({userId}).unwrap();
        console.log("DELETE DATA:", deleteData);

        const successMessage = {
          status: SUCCESS,
          message: deleteData?.data ?? "",
        };

        dispatch(addToast(successMessage));
        navigate(ContentValues.Employees);
      } catch (err) {
        console.log(err);
        const e = err as {
          data: IDeleteUserResponse;
        };
        const failMessage = {
          status: FAIL,
          message: e?.data?.error ?? "",
        };

        dispatch(addToast(failMessage));
      }
    },
    [deleteById, isLoading]
  );

  return { deleteUser, isLoading };
};

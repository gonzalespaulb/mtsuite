import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useResetPasswordMutation } from "../../api/authApi";
import { addToast } from "../../NotificationSlice";
import { FAIL, SUCCESS } from "../../../utils/status";
import { IResetPasswordRequest, IResetPasswordResponse } from "./types";

// interface IResetPasswordReq {
//   password: string;
//   uniqueCode: string;
// }

// interface IResetPasswordRes {
//   status: string;
//   success: boolean;
//   error?: string;
//   data?: string;
// }

export type TUseResetPasswordHook = () => {
  onResetPassword: (data: Omit<IResetPasswordRequest['data'], 'token'>) => Promise<boolean>;
  data: IResetPasswordResponse | undefined;
};

export const useResetPassword: TUseResetPasswordHook = () => {
  const {search} = useLocation();
  const query: URLSearchParams = useMemo(() => new URLSearchParams(search), [search]);

  const dispatch = useDispatch();

  const [handleOnResetPassword, { data }] = useResetPasswordMutation();

  const onResetPassword = useCallback(async (userInput: Omit<IResetPasswordRequest['data'], 'token'>) => {
    try {
      const token: string = query.get("token") ?? "";

      const resetData = await handleOnResetPassword({data: {password: userInput.password, uniqueCode: userInput.uniqueCode, token}}).unwrap();

      const successMessage = {
        status: SUCCESS,
        message: resetData?.data ?? ''
      };

      dispatch(addToast(successMessage));

      return true;
    } catch (err) {
      console.log(err);
      const e = err as {
        data: IResetPasswordResponse;
      };
      const failMessage = {
        status: FAIL,
        message: e?.data?.error ?? "",
      };

      dispatch(addToast(failMessage));
      return false;
    }
  }, [handleOnResetPassword, dispatch]);

  return {onResetPassword, data};
}
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useForgotPasswordMutation } from "../../api/authApi";
import { addToast } from "../../NotificationSlice";
import { FAIL, SUCCESS } from "../../../utils/status";
import { IForgotPasswordRequest, IForgotPasswordResponse } from "./types";

export type TUseForgotPasswordHook = () => {
  onForgotPassword: (data: IForgotPasswordRequest["data"]) => Promise<void>;
  isLoading: boolean;
};

export const useForgotPassword = () => {
  const dispatch = useDispatch();

  const [handleOnForgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onForgotPassword = useCallback(
    async (forgotPasswordInput: IForgotPasswordRequest["data"]) => {
      try {
        const data = await handleOnForgotPassword({
          data: forgotPasswordInput,
        }).unwrap();

        const successMessage = {
          status: SUCCESS,
          message: data?.data ?? "",
        };

        dispatch(addToast(successMessage));
      } catch (err) {
        const e = err as {
          data: IForgotPasswordResponse;
        };

        const failMessage = {
          status: FAIL,
          message: e?.data?.error ?? "",
        };

        dispatch(addToast(failMessage));
      }
    },
    [handleOnForgotPassword, dispatch]
  );

  return { onForgotPassword, isLoading };
};

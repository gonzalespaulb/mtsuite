import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "../../NotificationSlice";
import { FAIL, SUCCESS } from "../../../utils/status";
import { ICreateCustomShiftRequest, ICreateCustomShiftResponse } from "./types";
import { useCreateCustomShiftMutation } from "../../api/userApi";

export type TUserCreateCustomShiftHook = () => {
  onCreateCustomShift: (
    data: ICreateCustomShiftRequest["data"],
    employeeId: ICreateCustomShiftRequest["employeeId"]
  ) => Promise<void>;
};

export const useCreateCustomShift: TUserCreateCustomShiftHook = () => {
  const dispatch = useDispatch();

  const [handleOnCreateCustomShift] = useCreateCustomShiftMutation();

  const onCreateCustomShift = useCallback(
    async (
      newCustomShift: ICreateCustomShiftRequest["data"],
      employeeId: ICreateCustomShiftRequest["employeeId"]
    ) => {
      try {
        const data = await handleOnCreateCustomShift({
          data: newCustomShift,
          employeeId,
        }).unwrap();

        const successMessage = {
          status: SUCCESS,
          message: data?.data ?? "",
        };

        dispatch(addToast(successMessage));
      } catch (err) {
        console.log(err);

        const e = err as {
          data: ICreateCustomShiftResponse;
        };

        const failMessage = {
          status: FAIL,
          message: e?.data?.error ?? "",
        };

        dispatch(addToast(failMessage));
      }
    },
    [handleOnCreateCustomShift, dispatch]
  );

  return { onCreateCustomShift };
};

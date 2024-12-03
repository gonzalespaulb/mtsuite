import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "../../NotificationSlice";
import { FAIL, SUCCESS } from "../../../utils/status";
import { IDeleteCustomShiftRequest, IDeleteCustomShiftResponse } from "./types";
import { useDeleteCustomShiftMutation } from "../../api/userApi";

export type TUseDeleteCustomShiftHook = () => {
  onDeleteCustomShift: (
    customShiftId: IDeleteCustomShiftRequest["customShiftId"],
    employeeId: IDeleteCustomShiftRequest["employeeId"]
  ) => Promise<void>;
};

export const useDeleteCustomShift: TUseDeleteCustomShiftHook = () => {
  const dispatch = useDispatch();

  const [handleOnDeleteCustomShift] = useDeleteCustomShiftMutation();

  const onDeleteCustomShift = useCallback(
    async (
      customShiftId: IDeleteCustomShiftRequest["customShiftId"],
      employeeId: IDeleteCustomShiftRequest["employeeId"]
    ) => {
      try {
        const data = await handleOnDeleteCustomShift({
          customShiftId,
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
          data: IDeleteCustomShiftResponse;
        };

        const failMessage = {
          status: FAIL,
          message: e?.data?.error ?? "",
        };

        dispatch(addToast(failMessage));
      }
    },
    [handleOnDeleteCustomShift, dispatch]
  );

  return { onDeleteCustomShift };
};

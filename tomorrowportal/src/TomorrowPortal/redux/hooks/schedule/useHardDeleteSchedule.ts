import { useCallback } from "react";
import { useHardDeleteScheduleMutation } from "../../api/scheduleApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToast } from "../../NotificationSlice";
import { FAIL, SUCCESS } from "../../../utils/status";
import { IDeleteScheduleRequest, IDeleteScheduleResponse } from "./types";

// interface IDeleteScheduleRes {
//   status: string;
//   success: boolean;
//   error?: string;
//   data?: string;
// }

export type THardDeleteScheduleHook = () => {
  hardDeleteSchedule: (scheduleId: IDeleteScheduleRequest['scheduleId']) => Promise<void>;
};

export const useHardDeleteSchedule: THardDeleteScheduleHook = () => {
  const dispatch = useDispatch();

  const [handleOnHardDelete] = useHardDeleteScheduleMutation();

  const hardDeleteSchedule = useCallback(
    async (scheduleId: IDeleteScheduleRequest['scheduleId']) => {
      try {
        const deleteData = await handleOnHardDelete({scheduleId}).unwrap();

        const successMessage = {
          status: SUCCESS,
          message: deleteData?.data ?? "",
        };

        dispatch(addToast(successMessage));
      } catch (err) {
        console.log(err);

        const e = err as {
          data: IDeleteScheduleResponse;
        };

        const failMessage = {
          status: FAIL,
          message: e?.data?.error ?? "",
        };

        dispatch(addToast(failMessage))
      }
    },
    [handleOnHardDelete]
  )

  return { hardDeleteSchedule };
}

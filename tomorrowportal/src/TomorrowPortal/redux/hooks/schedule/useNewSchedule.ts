import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNewScheduleMutation } from "../../api/scheduleApi";
import { addToast } from "../../NotificationSlice";
import { FAIL, SUCCESS } from "../../../utils/status";
import { resetScheduleValues, setSelectedSchedule } from "../../ScheduleSlice";
import { useNavigate } from "react-router-dom";
import { getAllSchedules } from "../../EmployeeViewSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useGetAllSchedules } from "./useGetAllSchedules";
import { INewScheduleRequest, INewScheduleResponse } from "./types";

// interface IAssignedEmployee {
//   employeeId: string;
//   preferredName: string;
//   position: string[];
//   designation: string;
//   location: string;
//   startTime: string;
// }

// type TPosition =
//   | "Administrator"
//   | "Attendant"
//   | "Foreman"
//   | "Manager"
//   | "Operator"
//   | "Relief"
//   | "Supervisor"
//   | "Superuser";

// interface IPosition {
//   // position: string[];
//   position: TPosition[];
//   startTime: string;
// }

// interface ILocation {
//   designation: string;
//   positions: IPosition[];
//   terrain: string;
// }

// interface IDesignation {
//   designation: string;
//   startTimes: string[];
//   locations: ILocation[];
//   isActive: boolean;
//   createdAt: Date;
//   updatedAt: Date;
// }

// interface ISchedule {
//   title: string;
//   date: string;
//   designations: IDesignation[];
//   assignedEmployees: IAssignedEmployee[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// interface INewScheduleRes {
//   status: string;
//   success: boolean;
//   error?: string;
//   data?: string;
// }

// interface INewScheduleReq
//   extends Omit<ISchedule, "createdAt" | "updatedAt" | "designations"> {
//   designations: Omit<IDesignation, "createdAt" | "updatedAt">[];
// }

export type TUseNewScheduleHook = () => {
  onNewSchedule: (data: INewScheduleRequest['data']) => Promise<void>;
  data: INewScheduleResponse | undefined;
};

export const useNewSchedule: TUseNewScheduleHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [handleOnNewSchedule, { data }] = useNewScheduleMutation();

  const onNewSchedule = useCallback(
    async (newSchedule: INewScheduleRequest['data']) => {
      try {
        const scheduleData = await handleOnNewSchedule({data: newSchedule}).unwrap();

        const successMessage = {
          status: SUCCESS,
          message: scheduleData?.data ?? "",
        };

        const scheduleToView = {
          date: newSchedule.date,
          title: newSchedule.title,
        };

        dispatch(setSelectedSchedule(scheduleToView));
        navigate("/scheduleDetail");

        dispatch(resetScheduleValues());
        dispatch(addToast(successMessage));
      } catch (err) {
        console.log(err);
        const e = err as {
          data: INewScheduleResponse;
        };
        const failMessage = {
          status: FAIL,
          message: e?.data?.error ?? "",
        };

        dispatch(addToast(failMessage));
      }
    },
    [handleOnNewSchedule, dispatch]
  );

  return { onNewSchedule, data };
};

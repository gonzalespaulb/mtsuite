import { useCallback } from "react";
import { useEditScheduleMutation } from "../../api/scheduleApi";
import { useDispatch } from "react-redux";
import { addToast } from "../../NotificationSlice";
import { FAIL, SUCCESS } from "../../../utils/status";
import { IEditScheduleRequest, IEditScheduleResponse } from "./types";

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
//   isActive: boolean;
//   locations: ILocation[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// interface ISchedule {
//   _id: string;
//   title: string;
//   date: string;
//   designations: IDesignation[];
//   assignedEmployees: IAssignedEmployee[];
//   createdAt: Date;
//   updatedAt: Date;
// }

// interface IEditSchedule {
//   title?: string;
//   date?: string;
//   designations?: IDesignation[]
//   assignedEmployees?: IAssignedEmployee[];
// }

// interface IEditScheduleReq {
//   scheduleId: string;
//   data: Omit<IEditSchedule, 'designations'> & {
//     designations: Omit<IDesignation, 'createdAt'|'updatedAt'>[];
//   };
// }

// interface IEditScheduleRes {
//   status: string;
//   success: boolean;
//   error?: string;
//   data?: ISchedule;
// }

export type TUseEditScheduleHook = () => {
  onEditSchedule: (data: IEditScheduleRequest['data'], scheduleId: IEditScheduleRequest['scheduleId']) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
}

export const useEditSchedule: TUseEditScheduleHook = () => {
  const dispatch = useDispatch();

  const [handleOnEditSchedule, {isLoading, isSuccess}] = useEditScheduleMutation();

  const onEditSchedule = useCallback(
    async (data: IEditScheduleRequest['data'], scheduleId: IEditScheduleRequest['scheduleId']) => {
      try {
        const editedSchedule = await handleOnEditSchedule({scheduleId, data}).unwrap();

        const successMessage = {
          status: SUCCESS,
          message: `${editedSchedule.data?.title} has been edited!`,
        };

        dispatch(addToast(successMessage))
      } catch (err) {
        console.log(err);
        const e = err as {
          data: IEditScheduleResponse;
        };

        const failMessage = {
          status: FAIL,
          message: e?.data?.error ?? "",
        };

        dispatch(addToast(failMessage));
      }
    }, [handleOnEditSchedule, isLoading, isSuccess]
  );

  return {onEditSchedule, isLoading, isSuccess};
};

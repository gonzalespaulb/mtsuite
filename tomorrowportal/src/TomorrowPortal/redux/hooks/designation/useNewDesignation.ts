import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNewDesignationMutation } from "../../api/designationApi";
import { addToast } from "../../NotificationSlice";
import { FAIL, SUCCESS } from "../../../utils/status";
import { INewDesignationRequest, INewDesignationResponse } from "./types";

// NOTE --------------------------------------------------------------------------------------- INTERFACE
// type TPosition =
//   | "Administrator"
//   | "Attendant"
//   | "Foreman"
//   | "Manager"
//   | "Operator"
//   | "Relief"
//   | "Supervisor"
//   | "Superuser";

// interface IDesignation {
//   designation: string;
//   startTimes: string[];
//   locations: {
//     terrain: string;
//     designation: string;
//     positions: {
//       startTime: string;
//       position: TPosition[];
//     }[];
//   }[];
// }

// interface INewDesignationRequest {
//   designation: string;
//   startTimes: string[];
//   locations: {
//     terrain: string;
//     designation: string;
//     positions: {
//       startTime: string;
//       position: TPosition[];
//     }[];
//   }[];
// }

// interface INewDesignationResponse {
//   status: string;
//   success: boolean;
//   error?: string;
//   data?: string;
// }
// NOTE --------------------------------------------------------------------------------------- INTERFACE
export type TUseNewDesignation = () => {
  onNewDesignation: (data: INewDesignationRequest['data']) => Promise<void>;
  data: INewDesignationResponse | undefined;
};

export const useNewDesignation: TUseNewDesignation = () => {
  const dispatch = useDispatch();

  const [handleOnNewDesignation, { data }] = useNewDesignationMutation();

  const onNewDesignation = useCallback(
    async (newDesignation: INewDesignationRequest['data']) => {
      try {
        const designationData = await handleOnNewDesignation({data: newDesignation}).unwrap();

        const successMessage = {
          status: SUCCESS,
          message: designationData?.data ?? "",
        };

        dispatch(addToast(successMessage));
      } catch (err) {
        console.log(err);
        const e = err as {
          data: INewDesignationResponse;
        };
        const failMessage = {
          status: FAIL,
          message: e?.data?.error ?? "",
        };

        dispatch(addToast(failMessage));
      }
    },
    [handleOnNewDesignation, dispatch]
  );

  return { onNewDesignation, data };
};

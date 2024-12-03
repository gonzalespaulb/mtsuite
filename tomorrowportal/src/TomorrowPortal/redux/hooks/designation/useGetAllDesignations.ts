import { useGetAllDesignationsQuery } from "../../api/designationApi";
import { IGetAllDesignationResponse } from "./types";

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
//   isActive: boolean;
//   locations: {
//     terrain: string;
//     designation: string;
//     positions: {
//       startTime: string;
//       position: TPosition[];
//     }[];
//   }[];
// }

// interface IDesignationResponse {
//   status: string;
//   success: boolean;
//   error?: string;
//   data?: IDesignation[] | [];
// }

export type TGetAllDesignationsHook = () => {
  data?: IGetAllDesignationResponse;
  isLoading: boolean;
};

export const useGetAllDesignations: TGetAllDesignationsHook = () => {
  const {data, isLoading} = useGetAllDesignationsQuery();

  return {data, isLoading};
};

import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";

export const PAYLOAD_DEFAULT = "Payload Default";

type TPosition =
  | "Administrator"
  | "Attendant"
  | "Foreman"
  | "Manager"
  | "Operator"
  | "Relief"
  | "Supervisor"
  | "Superuser";

interface IDesignation {
  designation: string;
  startTimes: string[];
  isActive: boolean;
  locations: {
    terrain: string;
    designation: string;
    positions: {
      startTime: string;
      position: TPosition[];
    }[];
  }[];
}

interface ICustomShift {
  date: string;
  isActive: boolean;
  note: string;
  id: string;
}

interface IUser {
  firstName: any;
  lastName: any;
  preferredName: any;
  employeePosition: any;
  employeeId: any;
  email: any;
  mailingAddress: any;
  phoneNumber: any;
  terrainLimit: any;
  availableDays: any[];
  employeePicture: any;
  isActive?: boolean;
  customShifts: ICustomShift[];
}

interface IAssignedEmployee {
  employeeId: string;
  preferredName: string;
  position: string[];
  designation: string;
  location: string;
  startTime: string;
}

interface IPositionToValidate {
  higherPosition: number;
  position: string[];
  terrain: string;
  startTime: string;
}

interface IDate {
  day: number;
  month: number;
  year: number;
}

interface ISelectedSchedule {
  date: string;
  title: string;
}

interface IScheduleInitialState {
  positionToValidate: IPositionToValidate | null;
  currentEmployee: string | null;
  openEdit: boolean;
  openDesignationEdit: boolean;
  designationToEdit: null | IDesignation;
  allAssignedEmployees: IAssignedEmployee[];
  fetchedEmployees: IUser[];
  currentDesignation: string;
  currentLocation: string;
  title: string;
  date: IDate | null;
  designations: IDesignation[];
  selectedSchedule: ISelectedSchedule | null;
  scheduleToView: string;
}

const initialState: IScheduleInitialState = {
  positionToValidate: null,
  currentEmployee: null,
  currentDesignation: "",
  currentLocation: "",
  openEdit: false,
  openDesignationEdit: false,
  designationToEdit: null,
  selectedSchedule: null,
  allAssignedEmployees: [],
  fetchedEmployees: [],
  title: "",
  date: {
    day: 0,
    month: 0,
    year: 0,
  },
  designations: [],
  scheduleToView: "",
};

const ScheduleSlice = createSlice({
  name: "schedule",
  initialState: initialState,
  reducers:
    // NOTE -------------------------------------------------------------------------- FETCH ALL EMPLOYEES FOR SORTING

    {
      fetchAllEmployees: (state, action: PayloadAction<IUser[]>) => {
        state.fetchedEmployees = action.payload;
      },

      // NOTE -------------------------------------------------------------------------- POSITION THAT IS CHECKED FOR EMPLOYEE MATCHING

      validatePosition: (
        state,
        action: PayloadAction<IPositionToValidate | null>
      ) => {
        state.positionToValidate = action.payload;
      },

      // NOTE -------------------------------------------------------------------------- OPENS SIDEBAR FOR EMPLOYEE ASSIGNMENT

      setOpenEdit: (state, action: PayloadAction<boolean>) => {
        state.openEdit = action.payload;
      },

      // NOTE -------------------------------------------------------------------------- OPENS SIDEBAR FOR DESIGNATION TEMPORARY EDIT

      setOpenDesignationEdit: (state, action: PayloadAction<boolean>) => {
        state.openDesignationEdit = action.payload;
      },

      // NOTE -------------------------------------------------------------------------- SETS THE DESIGNATION TO BE EDITED TO SHOW UP ON THE DESIGNATION EDIT SIDEBAR

      setDesignationToEdit: (state, action: PayloadAction<string | null>) => {
        const designationToEdit = current(state.designations).find(
          (designation) => designation.designation === action.payload
        );

        if (designationToEdit) {
          state.designationToEdit = designationToEdit;
        }
      },

      // NOTE -------------------------------------------------------------------------- REPLACES THE DESIGNATION IN THE ORIGINAL ARRAY TO BE SENT AS A NEW SCHEDULE

      saveDesignationEdits: (
        state,
        action: PayloadAction<IDesignation | null>
      ) => {
        if (action.payload) {
          const editedDesignation = action.payload.designation;
          const designationList = current(state.designations).slice();

          const editedDesignationIndex = designationList.findIndex(
            (designation) => designation.designation === editedDesignation
          );

          designationList.splice(editedDesignationIndex, 1, action.payload);

          state.designations = designationList;
        }
      },

      // NOTE -------------------------------------------------------------------------- COMPLETES THE EMPLOYEE ASSIGNMENT PROCESS

      assignEmployee: (state, action: PayloadAction<string | null>) => {
        state.currentEmployee = action.payload;
      },

      // NOTE -------------------------------------------------------------------------- ADDS THE CHOSEN EMPLOYEE TO THE ASSIGNED EMPLOYEES ARRAY

      addToAllAssigned: (
        state,
        action: PayloadAction<IAssignedEmployee | IAssignedEmployee[]>
      ) => {
        if (Array.isArray(action.payload)) {
          state.allAssignedEmployees = action.payload;
        } else {
          state.allAssignedEmployees = [
            ...state.allAssignedEmployees,
            action.payload,
          ];
        }
      },

      // NOTE -------------------------------------------------------------------------- REMOVES THE EMPLOYEE FROM THE ASSIGNED EMPLOYEES ARRAY

      removeFromAllAssigned: (
        state,
        action: PayloadAction<IAssignedEmployee[]>
      ) => {
        state.allAssignedEmployees = action.payload;
      },

      // NOTE -------------------------------------------------------------------------- SETS THE LOCATION IN A DESIGNATION WHERE THE CHOSEN EMPLOYEE NEEDS TO BE ASSIGNED

      setLocationToAssign: (state, action: PayloadAction<string[]>) => {
        if (action.payload.length === 0) {
          state.currentDesignation = "";
          state.currentLocation = "";
          return;
        }

        state.currentDesignation = action.payload[0];
        state.currentLocation = action.payload[1];
      },

      // NOTE -------------------------------------------------------------------------- INITIALIZES THE DESIGNATION ON RENDER

      addDesignation: (state, action: PayloadAction<IDesignation[]>) => {
        state.designations = action.payload;
      },

      // NOTE -------------------------------------------------------------------------- SCHEDULE TITLE

      setTitle: (state, action: PayloadAction<string>) => {
        state.title = action.payload;
      },

      // NOTE -------------------------------------------------------------------------- SCHEDULE DATE

      setDate: (state, action: PayloadAction<Date>) => {
        const day = action.payload.getDate();
        const month = action.payload.getMonth();
        const year = action.payload.getFullYear();

        const updatedDate = {
          day,
          month,
          year,
        };
        state.date = updatedDate;
      },

      // NOTE -------------------------------------------------------------------------- SELECTED SCHEDULE FOR SCHEDULE DETAIL

      setSelectedSchedule: (
        state,
        action: PayloadAction<ISelectedSchedule>
      ) => {
        state.selectedSchedule = action.payload;
      },

      setScheduleToView: (state, action: PayloadAction<string>) => {
        state.scheduleToView = action.payload;
      },
      // NOTE -------------------------------------------------------------------------- RESET EMPLOYEE AND DESIGNATIONS LIST FOR NEW SCHEDULE

      resetScheduleValues: (state) => {
        state.designations = [];
        state.allAssignedEmployees = [];
      },
    },
});

export const {
  fetchAllEmployees,
  validatePosition,
  setOpenEdit,
  setOpenDesignationEdit,
  setDesignationToEdit,
  assignEmployee,
  addToAllAssigned,
  removeFromAllAssigned,
  setLocationToAssign,
  addDesignation,
  setTitle,
  setDate,
  setSelectedSchedule,
  resetScheduleValues,
  saveDesignationEdits,
  setScheduleToView,
} = ScheduleSlice.actions;
export default ScheduleSlice.reducer;

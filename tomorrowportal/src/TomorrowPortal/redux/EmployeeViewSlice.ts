import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// NOTE --------------------------------------------------------------------------------------- INTERFACE
type TLocation = string;

interface IAssignedEmployee {
  employeeId: string;
  preferredName: string;
  position: string[];
  designation: TLocation;
  location: string;
  startTime: string;
}

interface IPosition {
  position: string[];
  startTime: string;
}

interface ILocation {
  designation: string;
  positions: IPosition[];
  terrain: string;
}

interface IDesignation {
  designation: string;
  startTimes: string[];
  locations: ILocation[];
  createdAt: Date;
  updatedAt: Date;
}

interface ISchedule {
  _id: string;
  title: string;
  date: string;
  designations: IDesignation[];
  assignedEmployees: IAssignedEmployee[];
  createdAt: Date;
  updatedAt: Date;
  isDraft: boolean;
   
}

interface IRelevantSchedule {
  title: string;
  date: string;
}

interface ISelectedSchedule {
  date: string;
  title: string;
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

interface IInitialState {
  allEmployees: IUser[];
  allSchedules: ISchedule[];
  currentEmployee: string;
  employeeToDisplay: IUser | null;
  relevantSchedules: IRelevantSchedule[];
  selectedSchedule: null | ISelectedSchedule; 
}

// NOTE --------------------------------------------------------------------------------------- INTERFACE
const initialState: IInitialState = {
  currentEmployee: "",
  allEmployees: [],
  employeeToDisplay: null,
  allSchedules: [],
  relevantSchedules:[],
  selectedSchedule: null,
};

const EmployeeView = createSlice({
  name: "employeeView",
  initialState: initialState,
  reducers: {
    setCurrentEmployee: (state, action: PayloadAction<string>) => {
      state.currentEmployee = action.payload;
    },
    getAllEmployees: (state, action: PayloadAction<IUser[]>) => {
      const filteredEmployee = action.payload.filter(
        (employee) => employee.employeeId === state.currentEmployee
      );

      state.employeeToDisplay = filteredEmployee[0];
      state.allEmployees = action.payload;
    },
    getAllSchedules: (state, action: PayloadAction<ISchedule[]>) => {
      let scheduleArr: IRelevantSchedule[] = []; 

      for (const schedule of action.payload) {
        const checkForEmployee = schedule.assignedEmployees.filter(
          (employee) => employee.employeeId === state.currentEmployee
        );
        const employeeExists = checkForEmployee.length > 0;
    
        if (employeeExists && !schedule.isDraft) {
          const relevantSchedule = {
            title: schedule.title,
            date: schedule.date,
          };
          scheduleArr.push(relevantSchedule);
        }
      }
 
      state.relevantSchedules = scheduleArr;
      state.allSchedules = action.payload;
    },
    setSelectedSchedule: (state, action: PayloadAction<ISelectedSchedule>) => {
      state.selectedSchedule = action.payload;
    }
  },
});

export const { setCurrentEmployee, getAllEmployees, getAllSchedules, setSelectedSchedule } =
  EmployeeView.actions;
export default EmployeeView.reducer;

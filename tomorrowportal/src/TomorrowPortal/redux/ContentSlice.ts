import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPerformance {
  totalHours: number | undefined;
  lates: number | undefined;
  absences: number | undefined;
  ncns: number | undefined;
}

interface IStation {
  name: string;
  station: string[];
}

interface ICustomShift {
  date: string;
  isActive: boolean;
  note: string;
  id: string;
}

interface IEmployee {
  firstName: string;
  lastName: string;
  preferredName: string;
  employeeId: string;
  isActive: boolean;
  email: string;
  mailingAddress: string;
  employeePicture: string;
  employeePosition: string;
  phoneNumber: string;
  availableDays: string[];
  terrainLimit: number;
  liftsWorked: IStation[];
  performance: IPerformance;
  customShifts: ICustomShift[];
}

interface IInitialState {
  currentEmployee: IEmployee | null;
  employeeSort: string;
}

const initialState: IInitialState = {
  currentEmployee: null,
  employeeSort: "All Employees",
};

const ContentSlice = createSlice({
  name: `content`,
  initialState,
  reducers: {
    setCurrentEmployee: (state, action: PayloadAction<IEmployee>) => {
      state.currentEmployee = action.payload;
    },
    setEmployeeSort: (state, action: PayloadAction<string>) => {
      state.employeeSort = action.payload;
    },
  },
});

export const { setCurrentEmployee, setEmployeeSort } = ContentSlice.actions;
export default ContentSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// NOTE --------------------------------------------------------------------------------------- INTERFACE
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
}
// NOTE --------------------------------------------------------------------------------------- INTERFACE
interface IInitialState {
    employeePayload: IUser | null;
}   

const initialState: IInitialState = {
    employeePayload: null,
};

const PayloadSlice = createSlice({
  name: `payload`,
  initialState,
  reducers: {
    sendNewEmployeePayload: (state, action: PayloadAction<IUser | null>) => {
      state.employeePayload = action.payload;
    },
  },
});

export const { sendNewEmployeePayload } = PayloadSlice.actions;
export default PayloadSlice.reducer;
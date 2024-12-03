import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface INotification {
  status: string;
  message: string;
}

interface IToast {
  status: string;
  message: string;
}

interface IInitialState {
  notification: INotification | null;
  toastList: IToast[]; 
}

const initialState: IInitialState = {
  notification: null,
  toastList: [],
};

const NotificationSlice = createSlice({
  name: `notification`,
  initialState,
  reducers: {
    notify: (state, action: PayloadAction<INotification>) => {
      const { status, message } = action.payload;

      const newNotification = {
        status,
        message,
      };

      state.notification = newNotification;
    },

    addToast: (state, action: PayloadAction<IToast>) => {
      state.toastList.push(action.payload);
    },
    clearToastList: (state) => {
      state.toastList = [];
    },
  },
});

export const { notify, addToast, clearToastList } = NotificationSlice.actions;
export default NotificationSlice.reducer;

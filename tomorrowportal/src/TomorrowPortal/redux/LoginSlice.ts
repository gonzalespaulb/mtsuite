import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// NOTE --------------------------------------------------------------------------------------- INTERFACE

interface ILoginInitialState {
  token?: string | null;
}

// NOTE --------------------------------------------------------------------------------------- INTERFACE
const initialState: ILoginInitialState = {
  token: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    authLogin: (
      state: ILoginInitialState,
      action: PayloadAction<ILoginInitialState>
    ) => {
      const { token } = action.payload;
      state.token = token;

      localStorage.setItem("token", token ?? "");
    },
    authLogOut: (state: ILoginInitialState) => {
      state.token = null;
    },
  },
});

export const { authLogin, authLogOut } = AuthSlice.actions;
export default AuthSlice.reducer;

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authLogin } from "../../LoginSlice";
import { useLoginMutation } from "../../api/authApi";
import { ContentValues } from "../../../utils/enums";
import { setCurrentEmployee } from "../../EmployeeViewSlice";
import { addToast } from "../../NotificationSlice";
import { FAIL } from "../../../utils/status";
import { ILoginRequest } from "./types";

// interface ILoginRequest {
//   email: string;
//   password: string;
// }

export type TUseLoginHook = () => {
  login: (data: ILoginRequest['data']) => Promise<void>;
  isLoading: boolean;
};

export const useLogin: TUseLoginHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const loginUser = useCallback(
    async (data: ILoginRequest['data']) => {
      try {
        const loginData = await login({data}).unwrap();
        const auth = { token: loginData.token };
        dispatch(authLogin(auth));

        // FOR DECODING THE TOKEN
        const base64Url = auth.token?.split(".")[1] ?? "";
        const base64 = base64Url.replace("-", "+").replace("_", "/");
        const user: { employeeId: string; employeePosition: string } =
          JSON.parse(window.atob(base64));

        const whichView = () => {
          switch (user.employeePosition) {
            case "Administrator":
            case "Manager":
            case "Supervisor":
              return "Internal";
            default:
              return "External";
          }
        };

        dispatch(setCurrentEmployee(user.employeeId));
        window.localStorage.setItem(
          "CURRENT_LOGGED_IN_EMPLOYEE",
          JSON.stringify(user.employeeId)
        );

        if (whichView() === "Internal") {
          navigate(ContentValues.Employees, { replace: true });
        } else {
          navigate("/dashboardExternal", { replace: true });
        }

        // NOTE: Store in localStorage later
      } catch (error) {
        const invalidCredentials = {
          status: FAIL,
          message:
            "Let's try that again. The credentials you entered do not match our records.",
        };
        dispatch(addToast(invalidCredentials));
        console.log(error);
      }
    },
    [login, dispatch, isLoading]
  );

  return { login: loginUser, isLoading };
};

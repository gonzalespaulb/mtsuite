import { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import { MainContainer } from "./styles";

import {
  Dashboard,
  EmployeeDetail,
  Employees,
  NewEmployee,
  NewDesignation,
  NewSchedule,
  Calendar,
  ScheduleDetail,
  EditSchedule,
} from "./Views/Internal";

import {
  DashboardExternal,
  CalendarExternal,
  ScheduleDetailExternal,
  MyProfileExternal
} from "./Views/External";

import { Login, Onboard, NotificationContainer, ForgotPassword } from "./Views/Common";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getAllEmployees,
  getAllSchedules,
  setCurrentEmployee,
} from "../redux/EmployeeViewSlice";
import { useEmployees } from "../redux/hooks/user";
import { useGetAllSchedules } from "../redux/hooks/schedule";
import Helpdesk from "./Views/External/Helpdesk/Helpdesk";

type TPosition =
  | "Administrator"
  | "Attendant"
  | "Foreman"
  | "Manager"
  | "Operator"
  | "Relief"
  | "Supervisor"
  | "Superuser";

type TRoleType = "internal" | "external" | "any";
interface IDecodedUser {
  id: string;
  employeeId: string;
  employeePosition: TPosition;
  roleType: TRoleType;
}

const Pages = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [decodedUserAvailable, setDecodedUserAvailable] =
    useState<IDecodedUser | null>(null);

  // NOTE ------------------------------------------------------ DATA INITIALIZATION

  const fetchedEmployees = useEmployees().data?.data || [];
  const fetchedSchedules = useGetAllSchedules().data?.data || [];

  const CURRENT_LOGGED_IN_EMPLOYEE = window.localStorage.getItem(
    "CURRENT_LOGGED_IN_EMPLOYEE"
  );
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (CURRENT_LOGGED_IN_EMPLOYEE !== null) {
      {
        dispatch(setCurrentEmployee(JSON.parse(CURRENT_LOGGED_IN_EMPLOYEE)));
      }
    }
  }, []);

  useEffect(() => {
    const employeesFetched = fetchedEmployees.length > 0;
    const schedulesFetched = fetchedSchedules.length > 0;

    if (employeesFetched && schedulesFetched && CURRENT_LOGGED_IN_EMPLOYEE) {
      dispatch(getAllEmployees(fetchedEmployees));
      dispatch(getAllSchedules(fetchedSchedules));
    }
  }, [fetchedEmployees, fetchedSchedules]);

  useEffect(() => {
    if (!token && location.pathname !== "/onboard" && location.pathname !== "/forgotPassword") {
      navigate("/");
    } else if (token) {
      const decodedUser: IDecodedUser = jwtDecode(token ?? "");
      setDecodedUserAvailable(decodedUser);
    }
  }, [location.pathname, token]);

  const internalRoutes = () => (
    <>
      {/* INTERNAL */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/employeeDetail" element={<EmployeeDetail />} />
      <Route path="/newEmployee" element={<NewEmployee />} />
      <Route path="/newDesignation" element={<NewDesignation />} />
      <Route path="/newSchedule" element={<NewSchedule />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/scheduleDetail" element={<ScheduleDetail />} />
      <Route path="/editSchedule" element={<EditSchedule />} />

      {/* EXTERNAL */}
      <Route path="/dashboardExternal" element={<DashboardExternal />} />
      <Route path="/calendarExternal" element={<CalendarExternal />} />
      <Route
        path="/scheduleDetailExternal"
        element={<ScheduleDetailExternal />}
      />
      <Route path="/helpdeskExternal" element={<Helpdesk />} />
      <Route path="myProfileExternal" element={<MyProfileExternal />} />
    </>
  );

  const externalRoutes = () => (
    <>
      <Route path="/dashboardExternal" element={<DashboardExternal />} />
      <Route path="/calendarExternal" element={<CalendarExternal />} />
      <Route
        path="/scheduleDetailExternal"
        element={<ScheduleDetailExternal />}
      />
      <Route path="/helpdeskExternal" element={<Helpdesk />} />
      <Route path="myProfileExternal" element={<MyProfileExternal />} />
    </>
  );

  return (
    <MainContainer>
      <NotificationContainer />
      <Routes location={location} key={location.pathname}>
        {/* NON-LOGGED IN USERS */}
        <Route path="/" element={<Login />} />
        <Route path="/onboard" element={<Onboard />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        {decodedUserAvailable && decodedUserAvailable.roleType === "internal"
          ? internalRoutes()
          : externalRoutes()}
      </Routes>
    </MainContainer>
  );
};

export default Pages;

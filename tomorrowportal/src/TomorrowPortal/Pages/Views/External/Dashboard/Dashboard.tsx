import { useEffect, useState } from "react";
import { DropDown, NavBar } from "../Common";
import Content from "./Content/Content";
import { MainContainer } from "./styles";
import { useDispatch } from "react-redux";
import {
  getAllEmployees,
  getAllSchedules,
} from "../../../../redux/EmployeeViewSlice";
import { useEmployees } from "../../../../redux/hooks/user";
import { useGetAllSchedules } from "../../../../redux/hooks/schedule";

const Dashboard = () => {
  const dispatch = useDispatch();

  const {data: allEmployees, isFetching: employeesFetching} = useEmployees();
  const {data: allSchedules, isFetching: schedulesFetching} = useGetAllSchedules();

  const fetchedEmployees = allEmployees?.data || [];
  const fetchedSchedules = allSchedules?.data || [];

  // NOTE ------------------------------------------------------ DATA INITIALIZATION

  useEffect(() => {
    const employeesFetched = fetchedEmployees.length > 0;
    const schedulesFetched = fetchedSchedules.length > 0;

    if (employeesFetched && schedulesFetched) {
      dispatch(getAllEmployees(fetchedEmployees));
      dispatch(getAllSchedules(fetchedSchedules));
    }
  }, [fetchedEmployees, fetchedSchedules]);

  const [openDropDown, setOpenDropDown] = useState(false);

  
  return (
    <MainContainer>
      <DropDown openDropDown={openDropDown} />
      <NavBar setOpenDropDown={setOpenDropDown} openDropDown={openDropDown} />
      <Content isFetching={employeesFetching || schedulesFetching}/>
    </MainContainer>
  );
};

export default Dashboard;

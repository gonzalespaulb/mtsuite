import { MainContainer } from "./styles";
import { NavBar } from "../common";
import Content from "./Content/Content";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useEmployees } from "../../../../redux/hooks/user";
import { useGetAllSchedules } from "../../../../redux/hooks/schedule";
import { getAllEmployees, getAllSchedules, setCurrentEmployee } from "../../../../redux/EmployeeViewSlice";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import SideNav from "../common/SideNav/SideNav";

const Dashboard = () => {
  const fetchedEmployees = useEmployees().data?.data || [];
  const fetchedSchedules = useGetAllSchedules().data?.data || [];

  const dispatch = useDispatch();

  const {
    currentEmployee,
  } = useSelector((state: RootState) => state?.employeeViewControls);
  // NOTE ------------------------------------------------------ DATA INITIALIZATION

  useEffect(() => {
    dispatch(setCurrentEmployee(currentEmployee));

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
      <NavBar setOpenDropDown={setOpenDropDown} openDropDown={openDropDown}/>
      <SideNav setOpenDropDown={setOpenDropDown} openDropDown={openDropDown}/>
      <Content/>
    </MainContainer>
  );
};

export default Dashboard; 
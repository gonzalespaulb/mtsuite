import { NavBar } from "../common";
import Content from "./Content/Content";
import Controls from "./Controls/Controls";
import Edit from "./Edit/Edit";
import { MainContainer } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useEffect, useState } from "react";
import {
  fetchAllEmployees,
  resetScheduleValues,
} from "../../../../redux/ScheduleSlice";
import EditDesignation from "./EditDesignation/EditDesignation";
import { useEmployees } from "../../../../redux/hooks/user";
import SideNav from "../common/SideNav/SideNav";

const EditSchedule = () => {
  /*
    Add designation from calendar
    Assigned employees from calendar
*/

  const dispatch = useDispatch();

  const fetchedEmployees = useEmployees().data?.data || [];

  useEffect(() => {
    const employeesFetched = fetchedEmployees.length > 0;

    if (employeesFetched) {
      dispatch(fetchAllEmployees(fetchedEmployees));
    }
  }, [fetchedEmployees]);

  const { openEdit, openDesignationEdit } = useSelector(
    (state: RootState) => state?.scheduleControls
  );

  const [openDropDown, setOpenDropDown] = useState(false);
  return (
    <MainContainer>
      {openEdit ? <Edit /> : <></>}
      {openDesignationEdit ? <EditDesignation /> : <></>}
      <NavBar setOpenDropDown={setOpenDropDown} openDropDown={openDropDown}/>
      <SideNav setOpenDropDown={setOpenDropDown} openDropDown={openDropDown}/>
      <Controls />
      <Content />
    </MainContainer>
  );
};
export default EditSchedule;

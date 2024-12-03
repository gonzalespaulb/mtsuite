import { NavBar } from "../common";
import Content from "./Content/Content";
import Controls from "./Controls/Controls";
import Edit from "./Edit/Edit";
import { MainContainer } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { addDesignation, fetchAllEmployees, resetScheduleValues } from "../../../../redux/ScheduleSlice";
import EditDesignation from "./EditDesignation/EditDesignation";
import { useGetAllDesignations } from "../../../../redux/hooks/designation";
import { useEmployees } from "../../../../redux/hooks/user";
import SideNav from "../common/SideNav/SideNav";

const NewSchedule = () => {

  const dispatch = useDispatch();

  const fetchedDesignations = useGetAllDesignations().data?.data || [];
  const fetchedEmployees = useEmployees().data?.data || [];

  useEffect(() => {
    dispatch(resetScheduleValues())
  }, [])

  useEffect(() => {
    const designationsFetched = fetchedDesignations.length > 0;
    const employeesFetched = fetchedEmployees.length > 0;

    if (designationsFetched && employeesFetched) {
      dispatch(addDesignation(fetchedDesignations));
      dispatch(fetchAllEmployees(fetchedEmployees));
    }
  }, [fetchedDesignations, fetchedEmployees]);

  const { openEdit, openDesignationEdit } = useSelector(
    (state: RootState) => state?.scheduleControls
  );

  const [openDropDown, setOpenDropDown] = useState(false);
  return (
    <MainContainer> 
      {openEdit ? <Edit /> : <></>}
      {openDesignationEdit ? <EditDesignation/> : <></>}
      <SideNav setOpenDropDown={setOpenDropDown} openDropDown={openDropDown}/>
      <NavBar setOpenDropDown={setOpenDropDown} openDropDown={openDropDown}/>
      <Controls />
      <Content />
    </MainContainer>
  );
};
export default NewSchedule;

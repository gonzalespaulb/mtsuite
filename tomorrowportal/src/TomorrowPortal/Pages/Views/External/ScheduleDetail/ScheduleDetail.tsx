import { useEffect, useState } from "react";
import { DropDown, NavBar } from "../Common";
import { MainContainer } from "./styles";
import Content from "./Content/Content";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { setSelectedSchedule } from "../../../../redux/EmployeeViewSlice";
import { useDispatch } from "react-redux";

const ScheduleDetail = () => {
  const dispatch = useDispatch();
  const [openDropDown, setOpenDropDown] = useState(false);

  const { selectedSchedule } = useSelector(
    (state: RootState) => state?.employeeViewControls
  );

  useEffect(() => {
    const LAST_VIEWED_SCHEDULE = window.localStorage.getItem(
      "LAST_VIEWED_SCHEDULE"
    );

    if (!selectedSchedule && LAST_VIEWED_SCHEDULE) {
      dispatch(setSelectedSchedule(JSON.parse(LAST_VIEWED_SCHEDULE) || ""));
    }
  }, [selectedSchedule]);

  return (
    <MainContainer>
      <DropDown openDropDown={openDropDown} />
      <NavBar openDropDown={openDropDown} setOpenDropDown={setOpenDropDown} />
      <Content/> 
    </MainContainer>
  );
};

export default ScheduleDetail;

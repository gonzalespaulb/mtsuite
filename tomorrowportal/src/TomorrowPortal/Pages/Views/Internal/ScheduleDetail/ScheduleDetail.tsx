import { useEffect, useState } from "react";
import { NavBar } from "../common";
import Controls from "./Controls/Controls";
import { MainContainer } from "./styles";
import Content from "./Content/Content";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import SideNav from "../common/SideNav/SideNav";

interface ISelectedSchedule {
  date: string;
  title: string;
}

const ScheduleDetail = () => {

  const { selectedSchedule } = useSelector(
    (state: RootState) => state?.scheduleControls
  );

  // NOTE ----------------------------------------------------------- SCHEDULE TO BE DISPLAYED

  const [scheduleToDisplay, setScheduleToDisplay] =
    useState<ISelectedSchedule | null>(null);
 
  useEffect(() => {
    setScheduleToDisplay(selectedSchedule); 
  }, [selectedSchedule]);

  const [openDropDown, setOpenDropDown] = useState(false);
  return (
    <MainContainer>
      <SideNav setOpenDropDown={setOpenDropDown} openDropDown={openDropDown}/>
      <NavBar setOpenDropDown={setOpenDropDown} openDropDown={openDropDown}/>
      <Controls
        scheduleToDisplay={scheduleToDisplay}
        setScheduleToDisplay={setScheduleToDisplay}
      />
      <Content scheduleToDisplay={scheduleToDisplay} />
    </MainContainer>
  );
};

export default ScheduleDetail;

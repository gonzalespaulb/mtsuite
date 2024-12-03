import { useEffect, useState } from "react";
import { NavBar } from "../common";
import Content from "./Content/Content";
import { MainContainer } from "./styles";
import { useGetAllSchedulesQuery } from "../../../../redux/api/scheduleApi";
import SideNav from "../common/SideNav/SideNav";

const Calendar = () => {
  const { refetch } = useGetAllSchedulesQuery();

  useEffect(() => {
    refetch();
  }, []);

  const [openDropDown, setOpenDropDown] = useState(false);
  
  return (
    <MainContainer>
      <NavBar setOpenDropDown={setOpenDropDown} openDropDown={openDropDown}/>
      <SideNav setOpenDropDown={setOpenDropDown} openDropDown={openDropDown}/>
      <Content />
    </MainContainer>
  );
};

export default Calendar;
 
import {  MainContainer} from "./styles";
import Content from "./Content/Content";
import { DropDown, NavBar } from "../Common";
import { useState } from "react";

const Calendar = () => {

  const [openDropDown, setOpenDropDown] = useState(false);
  
  return (
    <MainContainer>
      <DropDown openDropDown={openDropDown}/>
      <NavBar setOpenDropDown={setOpenDropDown} openDropDown={openDropDown}/>
      <Content />
    </MainContainer>
  );
};

export default Calendar;
 
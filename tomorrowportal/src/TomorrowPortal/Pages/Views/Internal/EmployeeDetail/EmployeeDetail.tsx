import { useState } from "react";
import Content from "./Content/Content";
import Edit from "./Edit/Edit"; 
import { MainContainer } from "./styles";
import { NavBar } from "../common";
import CustomShift from "./CustomShift/CustomShift";
import SideNav from "../common/SideNav/SideNav";

const EmployeeDetail = () => {

  const [openEdit, setOpenEdit] = useState(false); 
  const [openCustomShift, setOpenCustomShift] = useState(false);

  const [openDropDown, setOpenDropDown] = useState(false);
  return (
    <MainContainer>
      {openEdit ? <Edit setOpenEdit={setOpenEdit}/> : <></>}
      {openCustomShift ? <CustomShift setOpenCustomShift={setOpenCustomShift}/> : <></>}
      <NavBar setOpenDropDown={setOpenDropDown} openDropDown={openDropDown}/>
      <SideNav setOpenDropDown={setOpenDropDown} openDropDown={openDropDown}/>
      <Content setOpenEdit={setOpenEdit} setOpenCustomShift={setOpenCustomShift}/>
    </MainContainer>
  );
};

export default EmployeeDetail;
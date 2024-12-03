import { useState } from "react";
import { MainContainer } from "./styles";
import { DropDown, NavBar } from "../Common";
import Content from "./Content/Content";

const MyProfile = () => {
  const [openDropDown, setOpenDropDown] = useState(false);

  return (
    <MainContainer>
      <DropDown openDropDown={openDropDown} />
      <NavBar setOpenDropDown={setOpenDropDown} openDropDown={openDropDown} />
      <Content/>
    </MainContainer>
  );
};

export default MyProfile;

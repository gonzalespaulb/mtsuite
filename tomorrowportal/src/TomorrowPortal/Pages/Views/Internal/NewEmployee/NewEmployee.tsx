import { NavBar } from "../common"
import SideNav from "../common/SideNav/SideNav"
import Content from "./Content/Content"
import Controls from "./Controls/Controls"
import { MainContainer } from "./styles"
import { useState } from "react"

const NewEmployee = () => {

  const [formPercentage, setFormPercentage] = useState<number>(0);
  const [validateForm, setValidateForm] = useState<boolean>(false);

  const [openDropDown, setOpenDropDown] = useState(false);
  return (
    <MainContainer>
      <SideNav setOpenDropDown={setOpenDropDown} openDropDown={openDropDown}/>
      <NavBar setOpenDropDown={setOpenDropDown} openDropDown={openDropDown}/>
      <Controls formPercentage={formPercentage} setValidateForm={setValidateForm}/>
      <Content setFormPercentage={setFormPercentage} isFormValidated={validateForm} setValidateForm={setValidateForm}/>
    </MainContainer>
  )
}
export default NewEmployee;
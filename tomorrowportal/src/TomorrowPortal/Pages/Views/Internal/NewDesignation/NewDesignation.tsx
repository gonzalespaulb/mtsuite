import { useState } from "react";
import { NavBar } from "../common";
import Content from "./Content/Content";
import Controls from "./Controls/Controls";
import { MainContainer } from "./styles";
import SideNav from "../common/SideNav/SideNav";

const NewDesignation = () => {

    const [formPercentage, setFormPercentage] = useState<number>(0);
    const [payload, setPayload] = useState<any>();

    const [openDropDown, setOpenDropDown] = useState(false);
    return (
        <MainContainer>
            <NavBar setOpenDropDown={setOpenDropDown} openDropDown={openDropDown}/>
            <SideNav setOpenDropDown={setOpenDropDown} openDropDown={openDropDown}/>
            <Controls payload={payload} formPercentage={formPercentage}/>
            <Content setPayload={setPayload} setFormPercentage={setFormPercentage}/>
        </MainContainer>
    )
}

export default NewDesignation;
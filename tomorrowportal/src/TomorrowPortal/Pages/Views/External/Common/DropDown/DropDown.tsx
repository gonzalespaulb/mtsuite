import { useNavigate } from "react-router-dom";
import { calendarPrimary, settingsPrimary, userPrimary } from "../../../assets";

import {
  Link,
  LinkContainer,
  LinkIcon,
  LogoutBtn,
  MainContainer,
  SidebarLinks,
} from "./styles";
import { FC } from "react";

interface IDropDown {
  openDropDown: boolean;
}

const DropDown: FC<IDropDown> = ({ openDropDown }) => {
  let navigate = useNavigate();

  const logoutHandle = () => {
    localStorage.removeItem("CURRENT_LOGGED_IN_EMPLOYEE");
    localStorage.removeItem("LAST_VIEWED_SCHEDULE");

    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <MainContainer openDropDown={openDropDown}>
      <SidebarLinks>
        <LinkContainer onClick={() => navigate("/myProfileExternal")}>
          <LinkIcon iconUrl={userPrimary} />
          <Link>MyProfile</Link>
        </LinkContainer>
        <LinkContainer onClick={() => navigate("/calendarExternal")}>
          <LinkIcon iconUrl={calendarPrimary} />
          <Link>Calendar</Link>
        </LinkContainer>
        <LinkContainer onClick={() => navigate("/helpdeskExternal")}>
          <LinkIcon iconUrl={settingsPrimary} />
          <Link>Helpdesk</Link>
        </LinkContainer>
      </SidebarLinks>
      <LogoutBtn onClick={logoutHandle}>
        <span>LOGOUT</span>
      </LogoutBtn>
    </MainContainer>
  );
};

export default DropDown;

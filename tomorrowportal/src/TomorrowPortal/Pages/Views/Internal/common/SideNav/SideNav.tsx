import { useLocation, useNavigate } from "react-router-dom";
import { ContentValues } from "../../../../../utils/enums";
import {
  calendarPrimary,
  dashPrimary,
  employeesPrimary,
} from "../../../assets";
import {
  Link,
  LinkContainer,
  LinkIcon,
  LinksContainer,
  LogoutBtn,
  MainContainer,
  PageIndicator,
  Weather,
} from "./styles";
import { FC } from "react";

interface ISideNav {
  openDropDown: boolean;
  setOpenDropDown: Function;
}

const SideNav:FC<ISideNav> = ({openDropDown, setOpenDropDown}) => {

  const location = useLocation();
  let navigate = useNavigate();

  const navigateHandle = (route: string) => {
    navigate(route);
    setOpenDropDown(false);
  }

  const logoutHandle = () => {
    localStorage.removeItem("CURRENT_LOGGED_IN_EMPLOYEE");
    localStorage.removeItem("LAST_VIEWED_SCHEDULE");

    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <MainContainer openDropDown={openDropDown}>
      <Weather>Snowmass Village | 43°</Weather>
      <LinksContainer>
        <LinkContainer onClick={() => navigateHandle("/dashboard")}>
          <LinkIcon iconUrl={dashPrimary}/>
          <Link>Dashboard</Link>
          <PageIndicator
            activePage={location.pathname}
            linkName={ContentValues.Dashboard}
          />
        </LinkContainer>
        <LinkContainer onClick={() => navigateHandle("/employees")}>
          <LinkIcon iconUrl={employeesPrimary} />
          <Link>Employees</Link>
          <PageIndicator
            activePage={location.pathname}
            linkName={ContentValues.Employees}
          />
        </LinkContainer>
        <LinkContainer onClick={() => navigateHandle("/calendar")}>
          <LinkIcon iconUrl={calendarPrimary} />
          <Link>Calendar</Link>
          <PageIndicator
            activePage={location.pathname}
            linkName={"/calendar"}
          />
        </LinkContainer>
      </LinksContainer>
      <LogoutBtn onClick={logoutHandle}>LOGOUT</LogoutBtn>
    </MainContainer>
  );
};

export default SideNav;

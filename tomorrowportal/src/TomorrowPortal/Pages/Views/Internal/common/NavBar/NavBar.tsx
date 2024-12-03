import {
  Greeting,
  GreetingContainer,
  MainContainer,
  PageLabel,
  ProfilePicture,
  Separator,
  Controls,
  NavBtnsContainer,
  NavBtn,
  NavIndicator,
  GreetingLogo,
  LogoContainer,
  LogoIcon,
  Logo,
  Menu,
} from "./styles";
import { ContentValues } from "../../../../../utils/enums";
import rollCall from "./assets/attendance.png";
import dash from "./assets/dash.png";
import employees from "./assets/employees.png";
import schedule from "./assets/schedule.png";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../../../../redux/store";
import { useSelector } from "react-redux";
import { FC, useEffect, useRef, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { tippingBurger } from "../../../assets";

interface INavBar {
  openDropDown: boolean;
  setOpenDropDown: Function;
}

const NavBar:FC<INavBar> = ({openDropDown, setOpenDropDown}) => {
  let navigate = useNavigate();
  const location = useLocation();

  const { employeeToDisplay } = useSelector(
    (state: RootState) => state?.employeeViewControls
  );

  const currentContent = () => {
    switch (location.pathname) {
      case ContentValues.Dashboard:
        return "Dashboard";
      case ContentValues.Employees:
        return "Directory";
      case ContentValues.EmployeeDetail:
        return "Employee Detail";
      case ContentValues.NewEmployee:
        return "New Employee";
      case "/newSchedule":
        return "New Schedule";
      case "/calendar":
        return "Calendar";
      case "/scheduleDetail":
        return "Schedule Detail";
    }
  };

  const [firstPlay, setFirstPlay] = useState(false);

  const burgerRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (firstPlay) {
      if (openDropDown) {
        burgerRef?.current?.playSegments([20, 45], true);
      } else if (!openDropDown) {
        burgerRef?.current?.playSegments([45, 20], true);
      }
    }
    burgerRef.current?.animationItem?.setSpeed(1.5);
    setFirstPlay(true);
  }, [openDropDown]);

  return (
    <MainContainer>
      <Logo onClick={() => navigate(ContentValues.Employees)}>mtsüite</Logo>

      <Menu onClick={() => setOpenDropDown(!openDropDown)}>
          <Lottie
            lottieRef={burgerRef}
            animationData={tippingBurger}
            loop={false}
            autoplay={false}
          ></Lottie>
        </Menu>
      {/* <GreetingLogo>
        <LogoContainer onClick={() => navigate(ContentValues.Dashboard)}>
          <LogoIcon />
        </LogoContainer>
        <GreetingContainer>
          <Greeting>
            {new Date().getMonth() + 1}/{new Date().getDate()}/
            {new Date().getFullYear()}
          </Greeting>
          <Separator />
          <PageLabel>{currentContent()}</PageLabel>
        </GreetingContainer>
      </GreetingLogo>
      <Controls>
        <NavBtnsContainer>
          <NavBtn
            icon={dash}
            onClick={() => {
              navigate(ContentValues.Dashboard);
            }}
          >
            <NavIndicator
              activePage={location.pathname}
              linkName={ContentValues.Dashboard}
            />
          </NavBtn>
          <NavBtn
            icon={employees}
            onClick={() => {
              navigate(ContentValues.Employees);
            }}
          >
            <NavIndicator
              activePage={location.pathname}
              linkName={ContentValues.Employees}
            />
          </NavBtn>
          <NavBtn
            icon={schedule}
            onClick={() => {
              navigate("/calendar");
            }}
          >
            <NavIndicator
              activePage={location.pathname}
              linkName={"/calendar"}
            />
          </NavBtn>
          <NavBtn icon={rollCall}>
            <NavIndicator
              activePage={location.pathname}
              linkName={ContentValues.RollCall}
            />
          </NavBtn>
        </NavBtnsContainer>
      </Controls> */}
      <ProfilePicture
        employeePicture={employeeToDisplay?.employeePicture || ""}
      />
    </MainContainer>
  );
};

export default NavBar;

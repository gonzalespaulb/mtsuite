import { useSelector } from "react-redux";
import {
  Logo,
  MainContainer,
  Menu,
  MenuPicture,
  NavProfilePicture,
} from "./styles";
import { RootState } from "../../../../../redux/store";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { tippingBurger } from "../../../assets";
import { useRef } from "react";

interface INavBar {
  setOpenDropDown: Function;
  openDropDown: boolean;
}

const NavBar: FC<INavBar> = ({ setOpenDropDown, openDropDown }) => {
  const { employeeToDisplay } = useSelector(
    (state: RootState) => state?.employeeViewControls
  );

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

  let navigate = useNavigate();

  return (
    <MainContainer>
      <Logo onClick={() => navigate("/dashboardExternal")} />
      <MenuPicture>
        <Menu onClick={() => setOpenDropDown(!openDropDown)}>
          <Lottie
            lottieRef={burgerRef}
            animationData={tippingBurger}
            loop={false}
            autoplay={false}
          ></Lottie>
        </Menu>
        <NavProfilePicture
          employeePicture={employeeToDisplay?.employeePicture}
        />
      </MenuPicture>
    </MainContainer>
  );
};

export default NavBar;

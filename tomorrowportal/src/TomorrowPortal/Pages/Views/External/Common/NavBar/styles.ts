import styled from "styled-components";
import { colors } from "../../../../../utils/colors";
import { flex } from "../../../../../utils/helpers";
import { logoPrimary } from "../../../assets";

export const MainContainer = styled.div`
  width: 100%;
  height: 65px;
  padding: 16px;
  background: ${colors.secondary};
  z-index: 20;
  ${flex("space-between", "center")}
  position: sticky;
  left: 0;
  top: 0;
  overflow: hidden;
  border-bottom: 1px solid ${colors.border};
`;

export const Logo = styled.div`
  height: 100%;
  aspect-ratio: 1 /1;
  background-image: url(${logoPrimary});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const MenuPicture = styled.div`
  height: 100%;
  ${flex(undefined, "center")}
`;

export const Menu = styled.div`
  height: 30px; 
  aspect-ratio: 1 /1;
  margin-right: 8px;
`;

interface NavProfilePictureProps {
  employeePicture: string;
}

export const NavProfilePicture = styled.div<NavProfilePictureProps>`
  height: 30px;
  aspect-ratio: 1/ 1;
  border-radius: 50%;
  background-image: url(${(props) => props.employeePicture});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

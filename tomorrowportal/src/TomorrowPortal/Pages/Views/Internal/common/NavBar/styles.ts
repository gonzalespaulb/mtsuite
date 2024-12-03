import styled from "styled-components";
import { flex } from "../../../../../utils/helpers";
import { colors } from "../../../../../utils/colors";
import { spacing } from "../../../../../utils/spacing";
import pg from "./assets/pg.png";
import logoIcon from "./assets/mountain.png";
import { inter, sizing } from "../../../../../utils/fonts";
import { zLayer } from "../../../../../utils/zIndex";
const { small } = spacing;

export const MainContainer = styled.div`
  ${flex("space-between", "center")}
  background: ${colors.secondary};
  border-bottom: 1px solid ${colors.border};
  position: sticky;
  top: 0;
  grid-area: 1 / 1 / 2 / 2;
  z-index: ${zLayer.controlsBar};
  padding: 16px;
  overflow: hidden;
  width: 100%;

  @media (max-width: 600px) {
    padding: 0 16px;
    height: 65px;
  }
`;

export const Logo = styled.span`
  font-size: 32px;
  line-height: 32px;
  font-weight: ${inter.bold};
  color: ${colors.primary};
  cursor: pointer;
`;

export const Menu = styled.div`
  height: 40px;
  aspect-ratio: 1 /1;
  margin-left: auto;
  margin-right: 16px;
  cursor: pointer;
`;

interface ProfilePictureProps {
  employeePicture: string;
}

export const ProfilePicture = styled.div<ProfilePictureProps>`
  height: 50px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background-image: url(${(props) => props.employeePicture});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const GreetingLogo = styled.div`
  ${flex(undefined, "center")}
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
`;

export const LogoContainer = styled.div`
  ${flex("center", "center")}
  height: 100%;
  padding: 0 24px;
  background: ${colors.primary};
  margin-right: 16px;
  cursor: pointer;
`;

export const LogoIcon = styled.div`
  height: 25px;
  width: 25px;
  background-image: url(${logoIcon});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 8px;
`;

export const GreetingContainer = styled.div`
  ${flex(undefined, "center")}
`;

export const PageLabel = styled.span`
  font-size: ${sizing.large};
  line-height: ${sizing.large};
  color: ${colors.primary};
  font-weight: ${inter.bold};
`;

export const Greeting = styled.span`
  font-size: ${sizing.large};
  line-height: ${sizing.large};
  color: ${colors.primary};
  font-weight: ${inter.regular};
`;

export const Separator = styled.div`
  width: 1px;
  background: black;
  height: 24px;
  margin: 0 ${small};
`;

export const Controls = styled.div`
  height: 50px;
  ${flex()}
`;

export const NavBtnsContainer = styled.div`
  height: 100%;
  ${flex(undefined, "center")}
  position: relative;
  margin-right: 24px;
`;

interface NavIndicatorProps {
  activePage: string | undefined;
  linkName: string;
}

export const NavIndicator = styled.div<NavIndicatorProps>`
  width: 25px;
  position: absolute;
  bottom: ${(props) => (props.activePage === props.linkName ? "-8px" : "0")};
  right: 0;
  height: 2px;
  opacity: ${(props) => (props.activePage === props.linkName ? 1 : 0)};
  background: ${colors.primary};
  transition: 0.3s ease;
`;

interface NavBtnProps {
  icon: string;
}

export const NavBtn = styled.div<NavBtnProps>`
  height: 25px;
  aspect-ratio: 1 / 1;
  background-image: url(${(props) => props.icon});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  position: relative;

  :not(:first-child) {
    margin-left: 24px;
  }
`;

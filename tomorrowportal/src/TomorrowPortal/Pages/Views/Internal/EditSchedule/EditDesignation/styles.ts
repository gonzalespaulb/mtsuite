import styled from "styled-components";
import { zLayer } from "../../../../../utils/zIndex";
import { colors } from "../../../../../utils/colors";
import { flex } from "../../../../../utils/helpers";
import { closeSecondary } from "../../../assets";
import { inter, sizing } from "../../../../../utils/fonts";

export const MainContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: ${zLayer.employeeEdit};
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 500px;
`;

interface OverlayProps {
  runAnimation: boolean;
}

export const Overlay = styled.div<OverlayProps>`
  background: ${colors.secondary};
  height: 100%;
  opacity: ${(props) => (props.runAnimation ? 0.8 : 0)};
  width: 100%;
  grid-area: 1 / 1 / 2 / 3;
  transition: 0.7s ease;
`;

interface SidebarProps {
  runAnimation: boolean;
}

export const Sidebar = styled.div<SidebarProps>`
  grid-area: 1 / 2 / 2 / 3;
  background: ${colors.secondary};
  border-left: 1px solid ${colors.border};
  overflow: scroll;
  position: relative;
  ${flex(undefined, undefined, "column")}
  opacity: ${(props) => (props.runAnimation ? 1 : 0)};
  transform: translateX(${(props) => (props.runAnimation ? 0 : "50%")});
  transition: 0.7s ease;
`;

export const TitleBar = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  height: 83px;
  flex-shrink: 0;
  width: 100%;
  background: linear-gradient(
    90deg,
    rgba(46, 94, 145, 1) 0%,
    rgba(27, 74, 120, 1) 100%
  );
  z-index: ${zLayer.titleBar};
  padding: 0 16px;
  ${flex("space-between", "center")}
`;

export const CloseBtn = styled.div`
  background-image: url(${closeSecondary});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 25px;
  width: 25px;
  cursor: pointer;
`;

export const Title = styled.span`
  font-size: ${sizing.large};
  line-height: ${sizing.large};
  color: ${colors.secondary};
  font-weight: ${inter.bold};
`;

export const ContentContainer = styled.div`
  width: 100%;
  ${flex(undefined, undefined, "column")}
  padding: 16px;
`;
// NOTE-------------------------------------------------------------------------- LIFT STATUS

export const StatusContainer = styled.div`
  width: 100%;
  height: 44px;
  font-size: 16px;
  line-height: 16px;
  font-weight: ${inter.semiBold};
  color: ${colors.primary};
  ${flex("space-between", "center")}
`;

export const StatusToggle = styled.div`
  height: 100%;
  border-radius: 5px;
  border: 1px solid ${colors.primary};
  overflow: hidden;
  ${flex()}
`;

interface StatusProps {
  isActive: boolean;
}

const Status = styled.div<StatusProps>`
  height: 100%;
  font-size: 16px;
  line-height: 16px;
  font-weight: ${inter.medium};
  ${flex("center", "center")}
  padding: 0 8px;
  cursor: pointer;
  transition: 0.3s ease;
`;

export const Active = styled(Status)`
  background: ${(props) => (props.isActive ? "#E8F5EB" : "transparent")};
  color: ${(props) => (props.isActive ? "#1F873A" : colors.primary)};
`;

export const StatusDivider = styled.div`
  height: 100%;
  width: 1px;
  background: ${colors.primary};
`;

export const Inactive = styled(Status)`
  background: ${(props) => (props.isActive ? "transparent" : "#FFD8DB")};
  color: ${(props) => (props.isActive ? colors.primary : "#FE9D9F")};
`;

// NOTE-------------------------------------------------------------------------- START TIMES

export const StartTimesContainer = styled.div`
  width: 100%;
  margin-top: 16px;
  font-size: 16px;
  line-height: 16px;
  font-weight: ${inter.semiBold};
  color: ${colors.primary};

  // background: red;
`;

export const StartTimesController = styled.div`
  width: 100%;
  height: 44px;
  ${flex("space-between", "center")}// background: green;
`;

export const TypeInBtn = styled.div`
  ${flex("center", "center")}
  border: 1px solid ${colors.primary};
  border-radius: 10px;
  height: 44px;
  overflow: hidden;
`;

interface AddBtnProps {
  runAnimation: boolean;
}

export const AddBtn = styled.div<AddBtnProps>`
  height: 100%;
  aspect-ratio: 1/1;
  background: ${colors.primary};
  border-right: 1px solid ${colors.primary};
  ${flex("center", "center")}
  cursor: pointer;
`;

interface TypeInputProps {
  runAnimation: boolean;
}

export const TypeInput = styled.input<TypeInputProps>`
  height: 100%;
  width: ${(props) => (props.runAnimation ? "100px" : "0px")};
  border: none;
  background: ${colors.input};
  padding: ${(props) => (props.runAnimation ? "16px" : "0px")};
  text-align: center;
  color: ${colors.primary};
  font-size: 12px;
  line-height: 12px;
  font-weight: ${inter.bold};
  transition: 0.3s ease;
`;

interface ConfirmBtnProps {
  runAnimation: boolean;
}

export const ConfirmBtn = styled.div<ConfirmBtnProps>`
  padding: 16px;
  background: ${colors.primary};
  ${flex("center", "center")}
  cursor: pointer;
  display: ${(props) => (props.runAnimation ? "block" : "none")};
  opacity: ${(props) => (props.runAnimation ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

interface IconProps {
  iconUrl: string;
  runAnimation?: boolean;
}

const Icon = styled.div<IconProps>`
  height: 10px;
  width: 10px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const AddIcon = styled(Icon)`
  background-image: url(${(props) => props.iconUrl});
  transform: rotateZ(${(props) => (props.runAnimation ? "0deg" : "-45deg")});
  transition: 0.3s ease;
`;

export const ConfirmIcon = styled(Icon)`
  background-image: url(${(props) => props.iconUrl});
`;

export const StartTimesList = styled.div`
  ${flex()}
  width: 100%;
  margin-top: 8px;
  overflow: auto;
  // background: blue;
`;

export const SelectionBtn = styled.div`
  border-radius: 10px;
  font-size: 12px;
  line-height: 12px;
  font-weight: ${inter.bold};
  padding: 0 16px;
  height: 44px;
  ${flex("center", "center")}
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid ${colors.primary};
  background: ${colors.secondary};
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  flex-wrap: wrap;

  :not(:last-child) {
    margin-right: 8px;
  }
`;

interface RemoveBtnProps {
  isRemoving: boolean;
}

export const RemoveBtn = styled.div<RemoveBtnProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: url(${closeSecondary});
  background-size: 10px;
  background-repeat: no-repeat;
  background-position: center;
  background-color: ${colors.lightRed};
  transform: translateY(${(props) => (props.isRemoving ? "0%" : "100%")});
  transition: 0.3s ease;
`;

export const SaveBtn = styled.div`
  font-size: 16px;
  line-height: 16px;
  font-weight: ${inter.medium};
  ${flex("center", "center")}
  margin-top: 16px;
  background: ${colors.primary};
  height: 44px;
  border-radius: 5px;
  color: ${colors.secondary};
  cursor: pointer;
  width: 100%;
`;

// NOTE-------------------------------------------------------------------------- LOCATIONS

export const LocationsContainer = styled.div`
  width: 100%;
  margin-top: 16px;
  font-size: 16px;
  line-height: 16px;
  font-weight: ${inter.semiBold};
  ${flex(undefined, undefined, "column")}
  // background: red;
`;
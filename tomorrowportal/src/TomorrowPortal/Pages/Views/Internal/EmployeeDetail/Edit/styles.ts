import styled from "styled-components";
import { colors } from "../../../../../utils/colors";
import { flex } from "../../../../../utils/helpers";
import { inter } from "../../../../../utils/fonts";
import { sizing } from "../../../../../utils/fonts";
import { closeSecondary } from "../../../assets";
import downArrow from "./assets/downArrow.png";
import editIcon from "./assets/edit.png";
import { zLayer } from "../../../../../utils/zIndex";

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
  width: 100%;
  background: ${colors.primary};
  background: linear-gradient(
    90deg,
    rgba(46, 94, 145, 1) 0%,
    rgba(27, 74, 120, 1) 100%
  );
  z-index: ${zLayer.titleBar};
  padding: 0 32px;
  flex-shrink: 0;
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

export const EditForm = styled.div`
  padding: 32px;
`;

export const InputContainer = styled.div`
  ${flex(undefined, undefined, "column")}
  position: relative;
  width: 100%;

  :not(:last-child) {
    margin-bottom: 24px;
  }
`;

export const Label = styled.label`
  font-size: 16px;
  line-height: 16px;
  margin-bottom: 16px;
  font-weight: ${inter.semiBold};
  color: ${colors.primary};
  display: block;
  margin-left: 2px;
`;

export const Input = styled.input`
  border: 1px solid ${colors.primary};
  background: ${colors.input};
  height: 44px;
  width: 100%;
  border-radius: 10px;
  padding: 0 16px;
  font-weight: ${inter.medium};
  color: ${colors.primary};
`;

// NOTE ------------------------------------------------ DROP DOWN INPUT

interface DropDownContainerProps {
  openPositions: boolean;
}

export const DropDownContainer = styled.div<DropDownContainerProps>`
  height: 44px;
  width: 100%;
  border-radius: 10px;
  background: ${colors.input};
  overflow: ${(props) => (props.openPositions ? "visible" : "hidden")};
  ${flex()}
  position: relative;
`;

export const DropDownBtn = styled.div`
  height: 100%;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  border-radius: 10px 0 0 10px;
  background-image: url(${downArrow});
  background-size: 20%;
  background-repeat: no-repeat;
  background-position: center;
  border-right: 1px solid ${colors.border};
`;

export const SelectedPositionContainer = styled.div`
  flex: 1;
  height: 100%;
  padding: 24px;
  ${flex(undefined, "center")}
`;

export const SelectedPosition = styled.span`
  font-weight: ${inter.medium};
  color: ${colors.primary};
`;

export const PositionsContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  transform: translateY(calc(100% + 8px));
  z-index: ${zLayer.positionsContainer};
  border: 1px solid ${colors.border};
  border-radius: 10px;
  overflow: hidden;
`;

export const Position = styled.div`
  height: 44px;
  width: 100%;
  padding: 24px;
  background: ${colors.secondary};
  cursor: pointer;
  ${flex("space-between", "center")}

  :hover {
    background: #eff0f4;
  }

  :not(:last-child) {
    border-bottom: 1px solid ${colors.border};
  }
`;

export const PositionText = styled.span`
  font-weight: ${inter.medium};
  color: ${colors.primary};
  font-size: 16px;
  line-height: 16px;
`;

interface PositionIndicatorProps {
  positionName: string;
  selectedPosition: string;
}

export const PositionIndicator = styled.div<PositionIndicatorProps>`
  height: 10px;
  width: 10px;
  background: ${colors.primary};
  border-radius: 50%;
  display: ${(props) =>
    props.positionName === props.selectedPosition ? "block" : "none"};
`;

//   NOTE --------------------------------------------------------------- TERRAIN LIMITATION

export const BtnGroup = styled.div`
  ${flex()}
  flex-wrap: wrap;
  gap: 8px;
`;

interface SelectionProps {
  isSelected: boolean;
}

export const Selection = styled.div<SelectionProps>`
  padding: 16px;
  border-radius: 10px;
  ${flex("center", "center")}
  cursor: pointer;
  background: ${(props) => (props.isSelected ? "#E6EFF9" : colors.input)};
  color: ${(props) => (props.isSelected ? "#0761C7" : colors.primary)};
  transition: 0.3s ease;
`;

export const SelectionText = styled.span`
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 1px;
  font-weight: ${inter.semiBold};
  white-space: nowrap;
`;

// NOTE ------------------------------------------------ SUBMIT OR DISCARD CHANGES

export const ControlsContainer = styled.div`
  width: 100%;
`;

const Btn = styled.div`
  height: 44px;
  width: 100%;
  border-radius: 5px;
  ${flex("center", "center")}
  cursor: pointer;
`;

export const SaveChanges = styled(Btn)`
  background: linear-gradient(
    90deg,
    rgba(46, 94, 145, 1) 0%,
    rgba(27, 74, 120, 1) 100%
  );
  margin-bottom: 8px;
  color: ${colors.secondary};
`;

export const DiscardChanges = styled(Btn)`
  border: 1px solid ${colors.primary};
  color: ${colors.primary};
`;

export const BtnText = styled.span`
  font-size: ${sizing.regular};
  line-height: ${sizing.regular};
  font-weight: ${inter.medium};
  letter-spacing: 1px;
`;

// NOTE ------------------------------------------------ PROFILE PICTURE

export const ChangePictureContainer = styled.div`
  ${flex(undefined, "center", "column")}
  border-radius: 10px;
  margin-bottom: 24px;
`;

interface ProfilePictureProps {
  profilePic: string;
}

export const ProfilePicture = styled.div<ProfilePictureProps>`
  height: 120px;
  width: 120px;
  background-image: url(${(props) => props.profilePic});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  margin-bottom: 16px;
  border: 1px solid ${colors.border};
  ${flex("flex-end", "flex-end")}
`;

export const EditBtn = styled.div`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: ${colors.primary};
  background-image: url(${editIcon});
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  transition: 0.3s ease;
  ${flex("center", "center")}
  overflow: hidden;
  :hover {
    transform: scale(1.2);
  }
`;

export const FileInput = styled.input`
  opacity: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
`;

// NOTE ------------------------------------------------ STATUS BTN

interface StatusContainerProps {
  isActive: boolean | undefined;
}

export const StatusContainer = styled.div<StatusContainerProps>`
  ${flex("center", "center")}
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid ${(props) => (props.isActive ? "#1b4332" : "#660708")};
  transition: 0.3s ease;
  height: 37px;
`;

interface DividerProps {
  isActive: boolean | undefined;
}

export const Divider = styled.div<DividerProps>`
  background: ${(props) => (props.isActive ? "#1b4332" : "#660708")};
  width: 1px;
  height: 100%;
`;

interface StatusBtnProps {
  isActive: boolean | undefined;
}

const StatusBtn = styled.div<StatusBtnProps>`
  ${flex("center", "center")}
  padding: 8px;
  height: 100%;
  cursor: pointer;
  transition: 0.3s ease;
`;

const Status = styled.span`
  font-size: 12px;
  line-height: 12px;
  font-weight: ${inter.semiBold};
`;

export const ActiveContainer = styled(StatusBtn)`
  background: ${(props) => (props.isActive ? "#95D5B1" : "transparent")};
  color: ${(props) => (props.isActive ? "#1b4332" : colors.primary)};
`;

export const InactiveContainer = styled(StatusBtn)`
  background: ${(props) => (!props.isActive ? "#F4958E" : "transparent")};
  color: ${(props) => (!props.isActive ? "#660708" : colors.primary)};
`;

export const Active = styled(Status)``;

export const Inactive = styled(Status)``;

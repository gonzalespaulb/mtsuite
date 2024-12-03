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
  flex: 1;
  gap: 24px;
`;

// NOTE ------------------------------------------------------------------ STATUS TOGGLE

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

export const CalendarContainer = styled.div`
  ${flex(undefined, undefined, "column")}
  width: 100%;
  font-size: 16px;
  line-height: 16px;
  font-weight: ${inter.semiBold};
  color: ${colors.primary};
`;

export const TextArea = styled.textarea`
  height: 160px;
  width: 100%;
  border-radius: 5px;
  background: ${colors.input};
  border: 1px solid ${colors.primary};
  margin-top: 16px;
  padding: 16px;
  font-weight: ${inter.medium};
  color: ${colors.primary};
`;

export const CreateBtn = styled.div`
  height: 44px;
  width: 100%;
  border-radius: 5px;
  background: ${colors.primary};
  ${flex("center", "center")}
  font-size: 16px;
  line-height: 16px;
  font-weight: ${inter.medium};
  color: ${colors.secondary};
  cursor: pointer;
`;

// NOTE -------------------------------------------------------------------- DATE SELECTOR

export const DateSelector = styled.div`
  height: 44px;
  ${flex(undefined, "center")};
  background: #eff0f4;
  border-radius: 10px;
  overflow: hidden;
`;

export const DateContainer = styled.div`
  padding: 16px;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 1px;
  font-weight: ${inter.bold};
  ${flex("center", "center")}
  overflow: hidden;
  border-left: 1px solid ${colors.secondary};
  z-index: 1;
  background #E6EFF9;
  color: #0761C7;
`;

interface MonthBtnProps {
  iconUrl: string;
}

export const MonthBtn = styled.div<MonthBtnProps>`
  height: 100%;
  aspect-ratio: 1 / 1;
  background-image: url(${(props) => props.iconUrl});
  background-size: 15px;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

export const DateController = styled.div`
  width: 100%;
  ${flex("space-between", "center")}
  margin-bottom: 16px;
`;

export const NoteContainer = styled.div`
  width: 100%;
  ${flex(undefined, undefined, "column")}
  font-size: 16px;
  line-height: 16px;
  font-weight: ${inter.semiBold};
  color: ${colors.primary};
`;

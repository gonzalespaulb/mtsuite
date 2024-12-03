import styled from "styled-components";
import { zLayer } from "../../../../../utils/zIndex";
import { colors } from "../../../../../utils/colors";
import { flex } from "../../../../../utils/helpers";
import { addPrimary, closeSecondary, downArrowPrimary } from "../../../assets";
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
  width: 100%;
  background: linear-gradient(90deg, rgba(46,94,145,1) 0%, rgba(27,74,120,1) 100%);
  z-index: ${zLayer.titleBar};
  padding: 0 32px;
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

export const EmployeeList = styled.div`
    width: 100%;
    flex: 1;
    overflow-y: scroll;
`;

export const EmployeeContainer = styled.div`
    width: 100%;
    height: 70px;
    padding: 0 32px;
    font-size: 16px;
    line-height: 16px;
    color: ${colors.primary};
    font-weight: ${inter.semiBold};
    ${flex(undefined, "center")}
    border-bottom: 1px solid ${colors.input};
    ${flex("space-between", "center")}
    cursor: pointer;
    transition: 0.3s ease;

    :hover {
      padding: 0 48px;
    }

    :not(:last-child) {
        margin-bottom: 8px;
    }
`;

export const IconContainer = styled.div`
    ${flex(undefined, "center")}
`;

const Icon = styled.div`
    height: 20px;
    width: 20px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
`;

export const Dropdown = styled(Icon)`
    background-image: url(${downArrowPrimary});
    height: 25px;
    width: 25px;
`;

export const Add = styled(Icon)`
    background-image: url(${addPrimary});
    margin-left: 16px;
`;
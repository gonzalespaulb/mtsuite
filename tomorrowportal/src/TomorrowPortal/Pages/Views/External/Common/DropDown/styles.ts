import styled from "styled-components";
import { colors } from "../../../../../utils/colors";
import { flex } from "../../../../../utils/helpers";
import { inter } from "../../../../../utils/fonts";

// NOTE ------------------------------------------- SIDEBAR

interface MainContainerProps {
  openDropDown: boolean;
}

export const MainContainer = styled.div<MainContainerProps>`
  width: 100vw;
  margin-top: 65px;
  background: ${colors.secondary};
  position: fixed;
  top: 0;
  right: 0;
  z-index: 15;
  ${flex("space-between", "center", "column")}
  padding: 0 16px 16px 16px;
  transform: translateY(${(props) => (props.openDropDown ? "0%" : "-100%")});
  border-bottom: 1px solid ${colors.border};
  border-top: 1px solid ${colors.border};
  opacity: ${(props) => (props.openDropDown ? 1 : 0)};
  transition: 0.7s ease;
`;

export const SidebarLinks = styled.div`
  ${flex(undefined, undefined, "column")}
  width: 100%;
`;

export const Link = styled.span`
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 1px;
  width: 100%;
  font-weight: ${inter.semiBold};
  color: ${colors.primary};
`;

export const LinkContainer = styled.div`
  ${flex(undefined, "center")}
  width: 100%;
  padding: 16px 0;
  border-bottom: 1px dashed ${colors.border};
  cursor: pointer;

  :not(:last-child) {
    margin-bottom: 8px;
  }
`;
interface InfoIconProps {
  iconUrl: string;
}

export const LinkIcon = styled.div<InfoIconProps>`
  height: 15px;
  aspect-ratio: 1 / 1;
  background-image: url(${(props) => props.iconUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 10px;
`;

export const LogoutBtn = styled.div`
  padding: 16px;
  font-size: 12px;
  line-height: 12px;
  background: ${colors.primary};
  color: ${colors.secondary};
  ${flex("center", "center")}
  font-weight: ${inter.bold};
  width: 100%;
  border-radius: 10px;
  letter-spacing: 1px;
  margin-top: 16px;
`;

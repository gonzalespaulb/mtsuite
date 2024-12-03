import styled from "styled-components";
import { colors } from "../../../../../utils/colors";
import { flex } from "../../../../../utils/helpers";
import { inter, sizing } from "../../../../../utils/fonts";

interface MainContainerProps {
  openDropDown: boolean;
}

export const MainContainer = styled.div<MainContainerProps>`
  position: fixed;
  width: 400px;
  height: calc(100vh - 83px);
  bottom: 0;
  right: 0;
  background: ${colors.secondary};
  border-left: 1px solid ${colors.border};
  z-index: 100;
  ${flex(undefined, "flex-end", "column")}
  padding: 16px;
  transform: translateX(${(props) => props.openDropDown ? "0%" : "100%"});
  transition: 0.3s ease;


  @media (max-width: 600px) {
    height: calc(100vh - 65px);
    width: 100%;
  }
`;

export const Weather = styled.span`
  font-size: ${sizing.regular};
  line-height: ${sizing.regular};
  font-weight: ${inter.regular};
  color: ${colors.primary};
  opacity: 0.5;
  margin-bottom: 16px;
`;

export const LinksContainer = styled.div`
  flex: 1;
  width: 100%;
  border-top: 1px dashed ${colors.border};
`;

export const Link = styled.span`
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 1px;
  font-weight: ${inter.semiBold};
  color: ${colors.primary};
`;

export const LinkContainer = styled.div`
  ${flex("flex-end", "center")}
  width: 100%;
  padding: 16px 0;
  cursor: pointer;
  transition: 0.3s ease;

  :hover {
    background: ${colors.input};
    padding: 16px;
  }

  :not(:last-child) {
    margin-bottom: 8px;
  }
`;
interface InfoIconProps {
  iconUrl: string;
}

export const LinkIcon = styled.div<InfoIconProps>`
  height: 20px;
  aspect-ratio: 1 / 1;
  background-image: url(${(props) => props.iconUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 10px;
`;

interface PageIndicatorProps {
  activePage: string;
  linkName: string;
}

export const PageIndicator = styled.div<PageIndicatorProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${colors.primary};
  margin-left: auto;
  opacity: ${(props) => props.activePage === props.linkName ? 1 : 0};
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
  flex-shrink: 0;
  cursor: pointer;
`;

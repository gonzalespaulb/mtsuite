import styled from "styled-components";
import { colors } from "../../../../../utils/colors";
import { zLayer } from "../../../../../utils/zIndex";
import { flex } from "../../../../../utils/helpers";
import { inter } from "../../../../../utils/fonts";
import close from "./assets/close.png";

interface MainContainerProps {
  runAnimation: boolean;
}

export const MainContainer = styled.div<MainContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: ${zLayer.confirmation};
  background: rgba(20,33,61, ${(props) => (props.runAnimation ? 0.8 : 0)});
  transition: 0.7s ease;
  ${flex("center", "center")}
`;

interface ConfirmationContainerProps {
  runAnimation: boolean;
}

export const ConfirmationContainer = styled.div<ConfirmationContainerProps>`
  width: 450px;
  background: ${colors.accent};
  border-radius: 10px;
  border: 1px solid ${colors.secondary};
  ${flex(undefined, undefined, "column")}
  transform: translateY(${(props) => (props.runAnimation ? 0 : "100%")});
  opacity: ${(props) => (props.runAnimation ? 1 : 0)};
  transition: 0.7s ease;
  overflow: hidden;
`;

export const HeadingContainer = styled.div`
  ${flex("space-between", "center")}
  padding: 24px;
  width: 100%;
  background: ${colors.primary};
  border-bottom: 1px dashed ${colors.border};
`;

export const Heading = styled.div`
  font-size: 18px;
  line-height: 18px;
  color: ${colors.secondary};
  font-weight: ${inter.bold};
`;

export const CloseBtn = styled.div`
  background-image: url(${close});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 25px;
  width: 25px;
  cursor: pointer;
`;

export const ContentContainer = styled.div`
  width: 100%;
  flex: 1;
  padding: 24px;
`;

export const WarningContainer = styled.div`
  width: 100%;
  padding: 24px;
  background: #f4968e;
  border-radius: 15px;
  border: 2px dashed #660809;
  margin-bottom: 24px;
`;

export const Warning = styled.p`
  font-size: 14px;
  line-height: 28px;
  font-weight: ${inter.semiBold};
  color: ##660809;
  text-align: center;
`;

export const ConfirmBtn = styled.div`
  height: 70px;
  width: 100%;
  background: ${colors.primary};
  color: ${colors.secondary};
  font-weight: ${inter.bold};
  ${flex("center", "center")}
  border-radius: 10px;
  cursor: pointer;
`;

export const ConfirmText = styled.span`
  font-size: 16px;
  line-height: 16px;
`;

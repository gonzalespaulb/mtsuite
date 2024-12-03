import styled, { keyframes } from "styled-components";
import { colors } from "../../../../../utils/colors";
import { inter } from "../../../../../utils/fonts";
import error from "./assets/error.png";
import success from "./assets/success.png";
import { SUCCESS } from "../../../../../utils/status";

const loadBar = keyframes`
  0% {
    transform: scaleX(1);
  }
  99% {
    transform: scaleX(0);
  }
  100 {
    transform: scaleX(1);
  }
`;

interface ToastContainerProps {
    runAnimation: boolean;
    displayToast: boolean;
}

export const ToastContainer = styled.div<ToastContainerProps>`
  display: ${(props) => props.displayToast ? "block" : "none"};
  width: 300px;
  background: ${colors.secondary};
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  opacity: ${(props) => props.runAnimation ? 1 : 0};
  transform: translateY(${(props) => props.runAnimation ? "0" : "-10%"});
  transition: 0.7s cubic-bezier(.51,.92,.24,1.15);

  :not(:last-child) {
    margin-bottom: 8px;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const IconMessageContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(min-content, max-content) 1fr;
  grid-column-gap: 16px;
  margin-bottom: 16px;
  align-items: start;
`;

interface IconProps {
  status: string;
}

export const Icon = styled.div<IconProps>`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-image: url(${(props) => props.status === SUCCESS ? success : error});
  background-size: cover;
  background-repeat: norepeat;
  background-position: center;
`;

export const Message = styled.span`
  font-size: 14px;
  line-height: 18px;
  font-weight: ${inter.medium};
  color: ${colors.primary};
`;

export const TimeoutBar = styled.div`
  width: 100%;
  height: 5px;
  border-radius: 5px;
  border: 1px solid ${colors.primary};
  overflow: hidden;
`;

interface TimeoutProps {
  runAnimation: boolean;
}

export const Timeout = styled.div<TimeoutProps>`
  background: ${colors.primary};
  height: 100%;
  width: 100%;
  animation-name: ${loadBar};
  animation-duration: 4.9s;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  animation-direction: normal;
  transform-origin: left;
`;

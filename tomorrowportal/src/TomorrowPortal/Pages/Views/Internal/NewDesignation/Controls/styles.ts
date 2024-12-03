import styled from "styled-components";
import { flex } from "../../../../../utils/helpers";
import { colors } from "../../../../../utils/colors";
import { zLayer } from "../../../../../utils/zIndex";
import { inter } from "../../../../../utils/fonts";

export const MainContainer = styled.div`
  position: sticky;
  top: 83px;
  ${flex("space-between", "center")}
  background: ${colors.secondary};
  z-index: ${zLayer.controlsBar};
  border-bottom: 1px solid ${colors.border};
  padding: 16px;
  width: 100%;
`;

export const ControlBtnsContainer = styled.div`
    ${flex("center", "center")}
`;

export const ProgressContainer = styled.div`
  height: 100%;
  ${flex("center", "center")}
`;

export const ProgressBar = styled.div`
  width: 250px;
  height: 5px;
  border-radius: 5px;
  border: 1px solid ${colors.primary};
  overflow: hidden;
`;

interface ProgressProps {
  formPercent: number;
}

export const Progress = styled.div<ProgressProps>`
  background: ${colors.primary};
  height: 100%;
  width: ${(props) => props.formPercent}%;
  transition: 0.3s ease;
`;

export const Percentage = styled.span`
  font-weight: ${inter.medium};
  margin-left: 16px;
  font-size: 14px;
  line-height: 14px;
`;
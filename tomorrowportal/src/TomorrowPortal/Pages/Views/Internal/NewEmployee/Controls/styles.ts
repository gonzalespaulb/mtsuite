import styled from "styled-components";
import { flex } from "../../../../../utils/helpers";
import { spacing } from "../../../../../utils/spacing";
import { inter, sizing } from "../../../../../utils/fonts";
import { colors } from "../../../../../utils/colors";
import { zLayer } from "../../../../../utils/zIndex";

export const MainContainer = styled.div`
  position: sticky;
  top: 83px;
  ${flex("space-between", "center")}
  background: ${colors.secondary};
  z-index: ${zLayer.controlsBar};
  border-bottom: 1px solid ${colors.border};
  overflow: hidden;
  padding: 16px;
  width: 100%;

  @media (min-width: 1450px) {
    padding: 16px 20%;
  }
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

export const ControlsContainer = styled.div`
  height: 100%;
  ${flex("center", "center")}//   padding: 24px;
`;

const Btn = styled.div`
  ${flex("center", "center")}
  padding: ${spacing.small};
  border-radius: 10px;
  cursor: pointer;
`;

const BtnText = styled.span`
  font-size: ${sizing.tiny};
  line-height: ${sizing.tiny};
  font-weight: ${inter.bold};
  letter-spacing: 1px;
  white-space: nowrap;
`;

export const Cancel = styled(Btn)`
  border: 1px solid ${colors.primary};
  margin-right: 8px;
`;

export const CreateEmployee = styled(Btn)`
  background: ${colors.primary};
`;

export const CancelText = styled(BtnText)`
  color: ${colors.primary};
`;

export const CreateEmployeeText = styled(BtnText)`
  color: ${colors.secondary};
`;

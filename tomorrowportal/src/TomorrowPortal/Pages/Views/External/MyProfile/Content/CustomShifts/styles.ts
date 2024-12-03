import styled from "styled-components";
import { colors } from "../../../../../../utils/colors";
import { inter } from "../../../../../../utils/fonts";
import { flex } from "../../../../../../utils/helpers";

export const MainContainer = styled.div`
  width: 100%;
  border: 1px solid ${colors.primary};
  overflow-x: scroll;
  overflow-y: hidden;
`;

export const LabelBar = styled.div`
  display: grid;
  height: 70px;
  border-bottom: 1px solid ${colors.primary};
  grid-template-columns: 0.5fr 1fr 0.5fr;
  min-width: 600px;

  @media (max-width: 800px) {
    height: 60px;
  }
`;

export const InfoLabel = styled.div`
  font-size: 16px;
  line-height: 16px;
  height: 100%;
  font-weight: ${inter.bold};
  ${flex("center", "center")}

  @media (max-width: 800px) {
    font-size: 14px;
    line-height: 14px;
  }
`;

interface ShiftBarProps {
  upcomingShift: boolean;
}

export const ShiftBar = styled.div<ShiftBarProps>`
  display: grid;
  height: 70px;
  grid-template-columns: 0.5fr 1fr 0.5fr;
  opacity: ${(props) => (props.upcomingShift ? 1 : 0.5)};
  min-width: 600px;

  @media (max-width: 800px) {
    height: 60px;
  }

  :not(:last-child) {
    border-bottom: 1px solid ${colors.primary};
  }
`;

export const ShiftInfo = styled.div`
  font-size: 16px;
  line-height: 16px;
  height: 100%;
  font-weight: ${inter.regular};
  ${flex("center", "center")}

  @media (max-width: 800px) {
    font-size: 14px;
    line-height: 14px;
  }

  :not(:last-child) {
    border-right: 1px solid ${colors.primary};
  }
`;

interface StatusProps {
  isActive: boolean;
}

export const Status = styled.div<StatusProps>`
  padding: 16px;
  font-size: 12px;
  line-height: 12px;
  background: ${(props) => (props.isActive ? "#95D5B1" : "#F4948E")};
  color: #252525;
  border-radius: 5px;
  overflow: hidden;
  letter-spacing: 1px;
  font-weight: ${inter.medium};
`;

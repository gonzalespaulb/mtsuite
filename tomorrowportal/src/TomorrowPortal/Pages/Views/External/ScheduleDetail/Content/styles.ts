import styled from "styled-components";
import { flex } from "../../../../../utils/helpers";
import { colors } from "../../../../../utils/colors";
import { inter } from "../../../../../utils/fonts";

export const MainContainer = styled.div`
  width: 100%;
  flex: 1;
`;

export const DesignationsContainer = styled.div`
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: minmax(min-content, max-content);
  grid-gap: 16px;
  align-items: start;
`;

export const ScheduleTitle = styled.div`
  width: 100%;
  padding: 16px;
  background: ${colors.secondary};
  font-size: 16px;
  line-height: 16px;
  font-weight: ${inter.semiBold};
  color: ${colors.primary};
  border-top: 1px solid ${colors.border};
  border-bottom: 1px solid ${colors.border};
  ${flex("center", "center")}
  position: sticky;
  top: 65px;
  z-index: 10;
`;

// NOTE ------------------------------------------------------------------------ DESIGNATION CARD

interface CardProps {
  isActive: boolean;
}

export const Card = styled.div<CardProps>`
  border-radius: 10px;
  border: 1px solid ${colors.primary};
  background: ${colors.secondary};
  ${flex(undefined, undefined, "column")}
  overflow: hidden;
  display: ${(props) => props.isActive ? "flex" : "none"};

  @media (max-width: 600px) {
    :not(:last-child) {
      border-bottom: 1px solid ${colors.primary};
    }
  }
`;

export const DesignationNameContainer = styled.div`
  height: 70px;
  width: 100%;
  background: ${colors.primary};
  ${flex("center", "center")}
  color: ${colors.secondary};
  font-size: 16px;
  line-height: 16px;
  font-weight: ${inter.bold};
  letter-spacing: 1px;
`;

export const LocationsContainer = styled.div`
  width: 100%;
  z-index: 2;
`;

export const LocationName = styled.div`
  width: 100%;
  padding: 16px;
  background: ${colors.secondary};
  font-size: 14px;
  line-height: 14px;
  color: ${colors.primary};
  font-weight: ${inter.bold};
  border-top: 1px solid ${colors.primary};
  ${flex("center", "center")}
`;

export const Position = styled.span`
  font-weight: ${inter.semiBold};
  font-size: 12px;
  line-height: 12px;
  border: 1px solid ${colors.primary};
  padding: 16px;
  background: #eff0f4;
  border-radius: 10px;

  :not(:last-child) {
    margin-right: 8px;
  }
`;

export const AssignEmployeeContainer = styled.div`
  width: 100%;
  height: 70px;
  ${flex(undefined, "center")}
  border-top: 1px solid ${colors.primary};
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

export const TimeContainer = styled.div`
  height: 100%;
  width: 24px;
  ${flex("center", "center")}
  background: ${colors.secondary};
  border-right: 1px solid ${colors.primary};
  overflow: hidden;
`;

export const Time = styled.span`
  font-size: 10px;
  line-height: 10px;
  font-weight: ${inter.bold};
  transform: rotateZ(-90deg);
`;

export const EmployeeInfoContainer = styled.div`
  flex: 1;
  overflow-x: scroll;
  height: 100%;
  ${flex(undefined, "center")}
  padding: 0 16px 0 0;
`;

interface IPositionColor {
  light: string;
  dark: string;
}

interface NameContainerProps {
  positionColor: IPositionColor;
}

export const NameContainer = styled.div<NameContainerProps>`
  height: 100%;
  padding: 0 16px;
  border-right: 1px solid ${colors.primary};
  ${flex("center", "center")}
  margin-right: 16px;
  background: ${(props) => props.positionColor.light};
  color: ${(props) => props.positionColor.dark};
`;

export const EmployeeName = styled.span`
  font-size: 16px;
  line-height: 16px;
  font-weight: ${inter.bold};
`;

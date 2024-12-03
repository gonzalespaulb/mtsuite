import styled from "styled-components";
import { flex } from "../../../../../../utils/helpers";
import { colors } from "../../../../../../utils/colors";
import { inter } from "../../../../../../utils/fonts";

export const MainContainer = styled.div`
  width: 100%;
  border: 1px solid ${colors.primary};
  padding-top: 8px;
`;

export const WeekDayContainer = styled.div`
  width: 100%;
  ${flex()}
  background: ${colors.secondary};
  padding-bottom: 8px;
  border-bottom: 1px solid ${colors.primary};
`;

export const WeekDay = styled.div`
  flex: 1;
  ${flex("center", "center")}
  padding: 8px;
  font-weight: ${inter.semiBold};
  color: ${colors.primary};
  font-size: 14px;
  line-height: 14px;
`;

export const MonthContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(min-content, max-content);
  background: ${colors.secondary};
  font-weight: ${inter.semiBold};
  overflow: hidden;
`;

interface DayProps {
  dayBoxColor: string;
  today: boolean;
  isSelected: boolean;
}

export const Day = styled.div<DayProps>`
  aspect-ratio: 1/1;
  ${flex("center", "center")}
  cursor: pointer;
  transition: 0.3s ease;
  background: ${(props) => props.dayBoxColor};
  color: ${(props) => props.today ? colors.secondary : colors.primary};
  border: ${(props) => props.isSelected ? `1px dashed ${colors.primary}` : "none"};

  :hover {
    background: ${colors.input};
  }
`;
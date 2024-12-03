import styled from "styled-components";
import { flex } from "../../../../../utils/helpers";
import { colors } from "../../../../../utils/colors";
import { inter } from "../../../../../utils/fonts";
import { closePrimary, leftSecondary, rightSecondary } from "../../../assets";

export const MainContainer = styled.div`
  flex: 1;
  width: 100%;
  ${flex(undefined, undefined, "column")}
`;

export const MonthSection = styled.div`
  width: 100%;
  padding: 32px 16px;
  z-index: 5;
`;

export const WeekDays = styled.div`
  width: 100%;
  margin-bottom: 16px;
  ${flex()}
`;

export const WeekDay = styled.div`
  flex: 1;
  font-size: 12px;
  line-height: 12px;
  ${flex("center", "center")}
  color: ${colors.primary};
  font-weight: ${inter.bold};
`;

export const MonthContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-radius: 5px;
  overflow: hidden;
  grid-auto-rows: minmax(min-content, max-content);
  border: 1px solid ${colors.primary};
`;

interface EventsSectionProps {
  openEvents: boolean;
}

export const EventsSection = styled.div<EventsSectionProps>`
  width: 100%;
  background: ${colors.secondary};
  flex: ${(props) => (props.openEvents ? 1 : 0)};
  transition: 0.3s ease;
  z-index: 1;
  ${flex(undefined, undefined, "column")}
  padding: 32px 16px;
  overflow: hidden;
`;

export const MonthControls = styled.div`
  width: 100%;
  padding: 16px;
  background: ${colors.primary};
  border-top: 1px solid ${colors.border};
  ${flex("space-between", "center")}
`;

export const CurrMonthYear = styled.span`
  font-size: 16px;
  line-height: 16px;
  font-weight: ${inter.semiBold};
  color: ${colors.secondary};
`;

const MonthBtns = styled.div`
  height: 20px;
  width: 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Prev = styled(MonthBtns)`
  background-image: url(${leftSecondary});
`;

export const Next = styled(MonthBtns)`
  background-image: url(${rightSecondary});
`;

export const SelectedDayContainer = styled.div`
  ${flex("space-between", "center")}
  width: 100%;
  margin-bottom: 8px;
`;

export const SelectedDay = styled.span`
  font-size: 18px;
  line-height: 18px;
  font-weight: ${inter.bold};
  color: ${colors.primary};
`;

export const CloseBtn = styled.div`
  height: 10px;
  aspect-ratio: 1/ 1;
  background-image: url(${closePrimary});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const UpcomingSchedules = styled.span`
  font-size: 14px;
  line-height: 14px;
  font-weight: ${inter.semiBold};
  margin-bottom: 24px;
  color: ${colors.primary};
  opacity: 0.5;
`;

export const EventsContainer = styled.div`
  width: 100%;
  ${flex(undefined, undefined, "column")}
`;

export const EventBtn = styled.div`
  padding: 16px;
  width: 100%;
  font-size: 12px;
  line-height: 12px;
  border-radius: 5px;
  ${flex("space-between", "center")}
  font-weight: ${inter.bold};
  background: #e6eff9;
  color: #0860c7;
  border: 1px solid #0860c7;
  :not(:last-child) {
    margin-bottom: 8px;
  }
`;

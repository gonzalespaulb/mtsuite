import { FC } from "react";
import { DAYS_OF_THE_WEEK } from "../../../../../../utils/enums";
import CalendarDay from "./CalendarDay";
import {
  Day,
  MainContainer,
  MonthContainer,
  WeekDay,
  WeekDayContainer,
} from "./styles";

interface ICalendar {
  updatedMonth: number;
  today: Date;
  clickAction: Function;
  selectedDate: string;
}

const Calendar: FC<ICalendar> = ({ updatedMonth, today, clickAction, selectedDate }) => {
  const firstOfTheMonth = new Date(new Date().getFullYear(), updatedMonth, 1);
  const lastDayOfTheMonth = new Date(
    new Date().getFullYear(),
    updatedMonth + 1,
    0
  );

  // NOTE ----------------------------------------------------------------- SUBTRACT FIRST OF THE MONTH WITH ITS DAY IF NOT SUNDAY

  const prevMonthHangingDates =
    firstOfTheMonth.getDate() - firstOfTheMonth.getDay();
  const prevMonth = new Date(
    new Date().getFullYear(),
    updatedMonth,
    prevMonthHangingDates
  );

  // NOTE ----------------------------------------------------------------- NEXT MONTH WILL RENDER THE FINAL SATURDAY

  const nextMonthHangingDates = 6 - lastDayOfTheMonth.getDay();
  const nextMonth = new Date(
    new Date().getFullYear(),
    updatedMonth,
    lastDayOfTheMonth.getDate() + nextMonthHangingDates
  );

  // NOTE ----------------------------------------------------------------- RETURNS THE FULL RANGE OF FIRST SUNDAY HANGING MONTH IF EXISTS AND LAST SATURDAY OF HANGING MONTH

  const getDates = (startDate: Date, endDate: Date) => {
    let dates = [];
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const dates = getDates(prevMonth, nextMonth);

  // NOTE ----------------------------------------------------------------- RENDER DAYS OF THE WEEK ON TOP OF THE CALENDAR
  const renderWeekDays = () => {
    return DAYS_OF_THE_WEEK.map((day) => {
      return (
        <WeekDay key={day}>
          <span>{day}</span>
        </WeekDay>
      );
    });
  };

  const renderDays = () => {
    return dates.map((date) => {
      return (
        <CalendarDay
          key={`${date}`}
          date={date}
          today={today}
          clickAction={clickAction}
          selectedDate={selectedDate}
        />
      );
    });
  };

  return (
    <MainContainer>
      <WeekDayContainer>{renderWeekDays()}</WeekDayContainer>
      <MonthContainer>{renderDays()}</MonthContainer>
    </MainContainer>
  );
};

export default Calendar;

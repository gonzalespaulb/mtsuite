import { FC } from "react";
import { Day } from "./styles";
import { formatDate } from "../../../../../../utils/helpers";
import { colors } from "../../../../../../utils/colors";

interface ICalendarDay {
  date: Date;
  today: Date;
  clickAction: Function;
  selectedDate: string;
}

const CalendarDay: FC<ICalendarDay> = ({ date, today, clickAction, selectedDate }) => {
  const dayBoxColor = () => {
    if (formatDate(today) === formatDate(date)) {
      return colors.primary;
    }
    if (new Date().getTime() > date.getTime()) {
      return "#E1E1E6";
    } else return colors.secondary;
  };

  return (
    <Day
      dayBoxColor={dayBoxColor()}
      today={formatDate(today) === formatDate(date)}
      onClick={() => clickAction(formatDate(date))}
      isSelected={selectedDate === formatDate(date)}
    >
      <span>{date.getDate()}</span>
    </Day>
  );
};

export default CalendarDay;

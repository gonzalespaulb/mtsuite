import { FC } from "react";
import { MainContainer, ScheduleIndicator } from "./styles";
import { colors } from "../../../../../../utils/colors";

interface IRelevantSchedule {
  title: string;
  date: string;
}

interface ICalendarDay {
  date: Date;
  setOpenEvents: Function;
  setSchedulesToRender: Function;
  relevantSchedules: IRelevantSchedule[];
}

const CalendarDay: FC<ICalendarDay> = ({
  date,
  setOpenEvents,
  relevantSchedules,
  setSchedulesToRender,
}) => {
  const today = new Date();

  const dateToCheck = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;
  const todaysDate = `${
    today.getMonth() + 1
  }/${today.getDate()}/${today.getFullYear()}`;

  const relevantDates = relevantSchedules.map((schedule) => schedule.date);
  const selectedDaysSchedules = relevantSchedules.filter((schedule) => {
    if(schedule.date === dateToCheck) return schedule;
  })

  const viewDaysSchedules = () => {

    const schedulesToRender = {
      date: dateToCheck, 
      schedules: selectedDaysSchedules,
    }

    setSchedulesToRender(schedulesToRender);
    setOpenEvents(true);
  }

  const dayBoxColor = () => {
    if (todaysDate === dateToCheck) {
      return colors.primary;
    }
    if (new Date().getTime() > date.getTime()) {
      return "#E1E1E6";
    } else return colors.secondary;
  };

  return (
    <MainContainer
      onClick={viewDaysSchedules}
      dayBoxColor={dayBoxColor()}
      today={todaysDate === dateToCheck}
    >
      <span>{date.getDate()}</span>
      <ScheduleIndicator
        hasSchedules={relevantDates.includes(dateToCheck)}
        today={todaysDate === dateToCheck}
      />
    </MainContainer>
  );
};

export default CalendarDay;

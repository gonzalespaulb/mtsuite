import { FC, useEffect, useState } from "react";
import { Day, DayContainer, ScheduleIndicator } from "./styles";
import { colors } from "../../../../../utils/colors";

type TLocation = string;

interface IAssignedEmployee {
  employeeId: string;
  preferredName: string;
  position: string[];
  designation: TLocation;
  location: string;
  startTime: string;
}

interface IPosition {
  position: string[];
  startTime: string;
}

interface ILocation {
  designation: string;
  positions: IPosition[];
  terrain: string;
}

interface IDesignation {
  designation: string;
  startTimes: string[];
  locations: ILocation[];
  createdAt: Date;
  updatedAt: Date;
}

interface ISchedule {
  _id: string;
  title: string;
  date: string;
  designations: IDesignation[];
  assignedEmployees: IAssignedEmployee[];
  createdAt: Date;
  updatedAt: Date;
}

interface ICalendarDay {
  date: Date;
  today: Date;
  dayClickAction: Function;
  allSchedules: ISchedule[] | null;
  selectedDay:string;
}

const CalendarDay: FC<ICalendarDay> = ({
  date,
  today,
  dayClickAction,
  allSchedules,
  selectedDay
}) => {
  const formattedDate = `${
    date ? date?.getMonth() + 1 : 0
  }/${date?.getDate()}/${date?.getFullYear()}`;
  const dateToCheck = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  const todaysDate = `${today.getMonth()}/${today.getDate()}/${today.getFullYear()}`;
  const [hasSchedules, setHasSchedules] = useState<string[]>(
    []
  );

  const filterSchedules = () => {
    if(allSchedules) {
      const filteredSchedules = allSchedules.filter((scheduleProfile) => scheduleProfile.date === formattedDate).map((scheduleDate) => scheduleDate.date);
      setHasSchedules(filteredSchedules)
    }
  }

  useEffect(() => {
    filterSchedules(); 
  }, [allSchedules])

  const dayBoxColor = () => {
    if (selectedDay === formattedDate) {
      return colors.primary;
    }
    if (new Date().getTime() > date.getTime()) {
      return "#E1E1E6";
    } else return colors.secondary;
  };

  

  return (
    <DayContainer
      today={selectedDay === formattedDate}
      pastDay={+todaysDate > +dateToCheck}
      dayBoxColor={dayBoxColor()}
      onClick={() => dayClickAction(date)}
      selected={selectedDay === formattedDate}
    >
      <Day>{date.getDate()}</Day>
      <ScheduleIndicator today={selectedDay === formattedDate} hasSchedules={hasSchedules.length > 0}/>
    </DayContainer>
  );
};

export default CalendarDay;

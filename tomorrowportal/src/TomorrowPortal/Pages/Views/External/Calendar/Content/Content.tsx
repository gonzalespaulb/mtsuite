import { useState } from "react";
import {
  CloseBtn,
  CurrMonthYear,
  EventBtn,
  EventsContainer,
  EventsSection,
  MainContainer,
  MonthContainer,
  MonthControls,
  MonthSection,
  Next,
  Prev,
  SelectedDay,
  SelectedDayContainer,
  UpcomingSchedules,
  WeekDay,
  WeekDays,
} from "./styles";
import CalendarDay from "./CalendarDay/CalendarDay";
import { DAYS_OF_THE_WEEK, MONTHS_LONG } from "../../../../../utils/enums";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedSchedule } from "../../../../../redux/EmployeeViewSlice";

interface ISchedule {
  title: string;
  date: string;
}

interface IScheduleToRender {
  date: string;
  schedules: ISchedule[];
}

const Content = () => {
  const { relevantSchedules } = useSelector(
    (state: RootState) => state?.employeeViewControls
  );

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [openEvents, setOpenEvents] = useState(false);
  const [updatedMonth, setUpdatedMonth] = useState(new Date().getMonth());
  const [schedulesToRender, setSchedulesToRender] =
    useState<IScheduleToRender | null>(null);

  const firstOfTheMonth = new Date(new Date().getFullYear(), updatedMonth, 1);
  const lastDayOfTheMonth = new Date(
    new Date().getFullYear(),
    updatedMonth + 1,
    0
  );

  const today = new Date(
    new Date().getFullYear(),
    updatedMonth,
    new Date().getDate()
  );

  // NOTE ---------------------------------------------------------------- FIRST SUNDAY

  const prevMonthHangingDates =
    firstOfTheMonth.getDate() - firstOfTheMonth.getDay();
  const prevMonth = new Date(
    new Date().getFullYear(),
    updatedMonth,
    prevMonthHangingDates
  );

  // NOTE ---------------------------------------------------------------- LAST SATURDAY

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

  const renderDates = () => {
    return dates.map((date, i) => {
      return (
        <CalendarDay
          key={i}
          date={date}
          setOpenEvents={setOpenEvents}
          relevantSchedules={relevantSchedules}
          setSchedulesToRender={setSchedulesToRender}
        />
      );
    });
  };

  const renderWeekDays = () => {
    return DAYS_OF_THE_WEEK.map((day, i) => {
      return (
        <WeekDay key={i}>
          <span>{day}</span>
        </WeekDay>
      );
    });
  };

  const renderEventBtns = () => {
    if (schedulesToRender) {
      return schedulesToRender.schedules.map((schedule, i) => {

        const schedulePayload = {
          date: schedule.date,
          title: schedule.title,
        }

        const scheduleHandle = () => {
          dispatch(setSelectedSchedule(schedulePayload));
          window.localStorage.setItem('LAST_VIEWED_SCHEDULE', JSON.stringify(schedulePayload));
          navigate("/scheduleDetailExternal");
        }

        return (
          <EventBtn key={`${schedule}${i}`}>
            <span>{schedule.title}</span>
            <span onClick={scheduleHandle}>VIEW</span>
          </EventBtn>
        );
      });
    }
  };

  const renderEventsSection = () => {
    if (schedulesToRender) {
      const parsedDate = schedulesToRender.date.split("/");
      const month = +parsedDate[0] - 1;
      const day = +parsedDate[1];
      const year = +parsedDate[2];

      const dayOfTheWeek = new Date(year, month, day).getDay();

      const selectedDayText = DAYS_OF_THE_WEEK[dayOfTheWeek];

      return (
        <EventsSection openEvents={openEvents}>
          <SelectedDayContainer>
            <SelectedDay>
              {selectedDayText} {schedulesToRender.date}
            </SelectedDay>
            <CloseBtn onClick={() => setSchedulesToRender(null)}/>
          </SelectedDayContainer>
          <UpcomingSchedules>Upcoming Schedules</UpcomingSchedules>
          <EventsContainer>{renderEventBtns()}</EventsContainer>
        </EventsSection>
      );
    } else return <></>;
  };

  return (
    <MainContainer>
      <MonthControls>
        <Prev onClick={() => setUpdatedMonth(updatedMonth - 1)}></Prev>
        <CurrMonthYear>
          {MONTHS_LONG[today.getMonth()].toUpperCase()} {today.getFullYear()}
        </CurrMonthYear>

        <Next onClick={() => setUpdatedMonth(updatedMonth + 1)}></Next>
      </MonthControls>
      <MonthSection>
        <WeekDays>{renderWeekDays()}</WeekDays>
        <MonthContainer>{renderDates()}</MonthContainer>
      </MonthSection>
      {renderEventsSection()}
    </MainContainer>
  );
};

export default Content;

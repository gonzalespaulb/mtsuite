import { FC, useEffect, useState } from "react";
import {
  Calendar,
  MainContainer,
  Month,
  SchedulesContainer,
  WeekDay,
  WeekDayContainer,
  DateContainer,
  DateSelector,
  MonthBtn,
  ScheduleControls,
  ScheduleList,
  NewScheduleBtn,
  ControlsContainer,
  InputContainer,
  TitleInput,
  CreateBtn,
} from "./styles";
import { DAYS_OF_THE_WEEK } from "../../../../../utils/enums";
import CalendarDay from "./CalendarDay";
import { useGetAllSchedules } from "../../../../../redux/hooks/schedule";
import { leftPrimary, rightPrimary } from "../../../assets";
import { MONTHS_LONG } from "../../../../../utils/enums";
import { setDate, setTitle } from "../../../../../redux/ScheduleSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { formatDate } from "../../../../../utils/helpers";
import ScheduleCard from "./ScheduleCard";
import { FAIL } from "../../../../../utils/status";
import { addToast } from "../../../../../redux/NotificationSlice";
import DeleteConfirm from "../../common/DeleteConfirm/DeleteConfirm";
import Loader from "../../../Common/Loader/Loader";

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

interface ICreatedBy {
  employeeId: string;
  preferredName: string;
  employeePicture: string;
}

interface ISchedule {
  _id: string;
  title: string;
  date: string;
  designations: IDesignation[];
  assignedEmployees: IAssignedEmployee[];
  createdBy: ICreatedBy;
  createdAt: Date;
  updatedAt: Date;
}

interface IContent {}

const Content: FC<IContent> = ({}) => {
  const today = new Date();
  const allSchedules = useGetAllSchedules()?.data?.data || []; 

  const { isFetching } = useGetAllSchedules();

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [updatedMonth, setUpdatedMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState<Date>(today);
  const [selectedDaySchedules, setSelectedDaySchedules] = useState<ISchedule[]>(
    []
  );
  const [creatingNewSchedule, setCreatingNewSchedule] =
    useState<boolean>(false);
  const [scheduleTitle, setScheduleTitle] = useState<string>("");

  const firstOfTheMonth = new Date(new Date().getFullYear(), updatedMonth, 1);
  const lastDayOfTheMonth = new Date(
    new Date().getFullYear(),
    updatedMonth + 1,
    0
  );

  const displayedYear = new Date(
    new Date().getFullYear(),
    updatedMonth,
    new Date().getDate()
  ).getFullYear();
  const displayedMonth = new Date(
    new Date().getFullYear(),
    updatedMonth,
    new Date().getDate()
  ).getMonth();

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

  // NOTE ----------------------------------------------------------------- RENDER ALL DATES FROM THE RANGE INTO EACH DAY AND ASSIGN IT ITS SPECIFIC DATE

  const dayClickAction = (date: Date) => {
    setSelectedDay(date);
  };

  const renderDates = () => {

    const formattedSelectedDay = formatDate(selectedDay);

    return dates.map((date) => {
      return (
        <CalendarDay
          key={`${date}`}
          date={date}
          today={today}
          dayClickAction={dayClickAction}
          allSchedules={allSchedules}
          selectedDay={formattedSelectedDay}
        />
      );
    });
  };


  // NOTE ----------------------------------------------------------------- RENDER DAYS OF THE WEEK ON TOP OF THE CALENDAR

  const renderWeekDays = () => {
    return DAYS_OF_THE_WEEK.map((day) => {
      return (
        <WeekDayContainer key={day}>
          <WeekDay>
            <span>{day}</span>
          </WeekDay>
        </WeekDayContainer>
      );
    });
  };

  // NOTE ----------------------------------------------------------------- RENDER SCHEDULE LIST

  const createSchedule = () => {
    if (scheduleTitle === "") {
      const noTitle = {
        status: FAIL,
        message: "Schedule is missing a title.",
      };

      dispatch(addToast(noTitle));
      return;
    }
    dispatch(setTitle(scheduleTitle.trim()));
    dispatch(setDate(selectedDay));
    navigate("/newSchedule");
  };

  const formattedDate = formatDate(selectedDay);

  useEffect(() => {
    if (allSchedules) {
      const filteredSchedules =
        allSchedules
          ?.filter((scheduleProfile) => scheduleProfile.date === formattedDate)
          .map((schedule) => schedule) ?? [];
      setSelectedDaySchedules(filteredSchedules);
    }
  }, [allSchedules, selectedDay]);


  const [scheduleToDelete, setScheduleToDelete] = useState("");

  const renderScheduleList = () => {

    
    return selectedDaySchedules?.map((schedule) => {
      // const deleteSchedule = () => {
      //   setScheduleToDelete(schedule.title);
      // }
      return (
        <ScheduleCard
          scheduleName={schedule.title}
          createdAt={schedule.createdAt}
          selectedDay={selectedDay}
          allSchedules={allSchedules}
          createdBy={schedule.createdBy}
          
        />
      );
    });
  };

  return (
    <MainContainer>
      <Calendar>
        <WeekDayContainer>{renderWeekDays()}</WeekDayContainer>
        <Month>{renderDates()}</Month>
        <DateSelector>
          <MonthBtn
            iconUrl={leftPrimary}
            onClick={() => setUpdatedMonth(updatedMonth - 1)}
          />
          <MonthBtn
            iconUrl={rightPrimary}
            onClick={() => setUpdatedMonth(updatedMonth + 1)}
          />
          <DateContainer>
            <span>
              {MONTHS_LONG[displayedMonth].toUpperCase()} {displayedYear}
            </span>
          </DateContainer>
        </DateSelector>
      </Calendar>
      <SchedulesContainer>
        <ControlsContainer creatingNewSchedule={creatingNewSchedule}>
          <ScheduleControls>
            <span>{formatDate(selectedDay)}</span>
            <NewScheduleBtn
              onClick={() => setCreatingNewSchedule(!creatingNewSchedule)}
            />
          </ScheduleControls>
          <InputContainer>
            <TitleInput
              placeholder="SCHEDULE TITLE HERE"
              value={scheduleTitle}
              onChange={(e) => setScheduleTitle(e.target.value)}
            />
            <CreateBtn onClick={createSchedule}>
              <span>CREATE</span>
            </CreateBtn>
          </InputContainer>
        </ControlsContainer>
        <ScheduleList>
          {isFetching ? <Loader/> : renderScheduleList()}
        </ScheduleList>
      </SchedulesContainer>

    </MainContainer>
  );
};

export default Content;

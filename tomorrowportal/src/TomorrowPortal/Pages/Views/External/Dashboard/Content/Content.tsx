import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { v4 as uuidv4 } from "uuid";
import {
  EmployeeId,
  EmployeeInfo,
  EventsContainer,
  EventsSection,
  InfoCard,
  InfoSection,
  MainContainer,
  Name,
  Position,
  ProfilePicture,
  SectionLabel,
} from "./styles";
import EventCard from "./EventCard/EventCard";
import { formatDate, parseDate } from "../../../../../utils/helpers";
import { positionColors } from "../../../../../utils/colors";
import { FC } from "react";
import Loader from "../../../Common/Loader/Loader";

interface IContent {
  isFetching: boolean;
}

const Content: FC<IContent> = ({ isFetching }) => {
  const {
    currentEmployee,
    employeeToDisplay,
    relevantSchedules,
    allSchedules,
  } = useSelector((state: RootState) => state?.employeeViewControls);

  // NOTE ------------------------------------------------------ FILTER SCHEDULES RELEVANT TO EMPLOYEE ID

  const filteredSchedules = allSchedules.filter((schedule) => {
    const scheduleToCheck = `${schedule.title}${schedule.date}`;
    const arrayToCheck = relevantSchedules.map(
      (schedule) => `${schedule.title}${schedule.date}`
    );

    if (arrayToCheck.includes(scheduleToCheck)) return schedule;
  });

  // NOTE ------------------------------------------------------ REFORMAT ASSIGNMENTS TO INCLUDE SCHEDULE INFORMATION

  const relevantAssignments = filteredSchedules
    .map((schedule) => {
      const assignment = {
        schedule: {
          title: schedule.title,
          date: schedule.date,
          isDraft: schedule.isDraft,
        },
        assignedEmployees: schedule.assignedEmployees,
      };
      return assignment;
    })
    .sort(
      (a, b) =>
        parseDate(a.schedule.date).getTime() -
        parseDate(b.schedule.date).getTime()
    )
    .filter((assignment) => {
      const today = new Date();
      const scheduleDate = parseDate(assignment.schedule.date);

      if (
        (assignment.schedule.isDraft !== true &&
          scheduleDate.getTime() > today.getTime()) ||
        formatDate(scheduleDate) === formatDate(today)
      ) {
        return assignment;
      }
    });

  // NOTE ------------------------------------------------------ FILTERS ASSIGNMENTS RELEVANT TO EMPLOYEE ID AND RENDERS CARDS FOR IT

  const renderEmployeeAssignments = () => {
    return relevantAssignments?.map((assignment) => {
      const filteredAssignment = assignment.assignedEmployees.filter(
        (employee) => employee.employeeId === currentEmployee
      )[0];

      const { date } = assignment.schedule;

      const parsedDate = parseDate(date);

      const cardInfo = {
        title: assignment?.schedule?.title || "",
        date: parsedDate,
        designation: filteredAssignment?.designation || "",
        location: filteredAssignment?.location || "",
        startTime: filteredAssignment?.startTime || "",
        position: filteredAssignment?.position || [],
      };

      return <EventCard cardInfo={cardInfo} key={uuidv4()} />;
    });
  };

  const positionColor = positionColors(employeeToDisplay?.employeePosition) || {
    light: "",
    dark: "",
  };

  return (
    <MainContainer>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          {" "}
          <InfoSection>
            <InfoCard>
              <ProfilePicture
                employeePicture={employeeToDisplay?.employeePicture || ""}
              />
              <EmployeeInfo>
                <Name>
                  {employeeToDisplay?.firstName || ""}{" "}
                  {employeeToDisplay?.lastName || ""}
                </Name>
                <EmployeeId>{employeeToDisplay?.employeeId || ""}</EmployeeId>
                <Position positionColor={positionColor}>
                  {employeeToDisplay?.employeePosition || ""}
                </Position>
              </EmployeeInfo>
            </InfoCard>
          </InfoSection>
          <SectionLabel>
            <span>Upcoming Events</span>
          </SectionLabel>
          <EventsSection>
            <EventsContainer>{renderEmployeeAssignments()}</EventsContainer>
          </EventsSection>
        </>
      )}
    </MainContainer>
  );
};

export default Content;

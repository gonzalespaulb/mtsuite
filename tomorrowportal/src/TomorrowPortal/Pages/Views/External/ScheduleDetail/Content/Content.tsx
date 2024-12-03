import { FC, useEffect, useState } from "react";
import { DesignationsContainer, MainContainer, ScheduleTitle } from "./styles";
import DesignationCard from "./DesignationCard/DesignationCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";

interface IContent {}

const Content: FC<IContent> = () => {
  const { selectedSchedule, allSchedules } = useSelector(
    (state: RootState) => state?.employeeViewControls
  );

  //   NOTE ------- FROM REDUX
  const dateToCheck = selectedSchedule?.date;

  const relevantSchedules = allSchedules.filter(
    (schedule) => schedule.date === dateToCheck
  );

  //   NOTE ------- REPLACE ANY WITH THE PROPER INTERFACE
  const [scheduleToRender, setScheduleToRender] = useState<any>();

  useEffect(() => {
    const foundSchedule = relevantSchedules.find(
      (schedule) => schedule.title === selectedSchedule?.title
    );

    setScheduleToRender(foundSchedule);
  }, [selectedSchedule, relevantSchedules]);

  const allDesignations = scheduleToRender?.designations || [];
  const assignedEmployees = scheduleToRender?.assignedEmployees || [];

  const renderDesignations = () => {
    return allDesignations.map((designation: any) => {
      const designationName = designation.designation;
      const locations = designation.locations;

      return (
        <DesignationCard
          key={designation}
          designationName={designationName}
          locations={locations}
          assignedEmployees={assignedEmployees}
          designationStatus={designation.isActive}
        />
      );
    });
  };

  return (
    <MainContainer>
      <ScheduleTitle>
        <span>{scheduleToRender?.title || ""}</span>
      </ScheduleTitle>
      <DesignationsContainer>{renderDesignations()}</DesignationsContainer>
    </MainContainer>
  );
};

export default Content;

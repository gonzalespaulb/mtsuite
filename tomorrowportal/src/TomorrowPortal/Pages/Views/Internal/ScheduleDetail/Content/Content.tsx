import { FC, useEffect, useState } from "react";
import { MainContainer } from "./styles";
import DesignationCard from "./DesignationCard/DesignationCard";
import { useGetAllSchedules } from "../../../../../redux/hooks/schedule";
import { useGetAllSchedulesQuery } from "../../../../../redux/api/scheduleApi";

interface ISelectedSchedule {
  title: string;
  date: string;
}

interface IContent {
  scheduleToDisplay: ISelectedSchedule | null;
}

const Content: FC<IContent> = ({ scheduleToDisplay }) => {
  const { data } = useGetAllSchedules();
  const { refetch } = useGetAllSchedulesQuery();

  //   NOTE ------- FROM REDUX
  const dateToCheck = scheduleToDisplay?.date;

  //   NOTE ------- GET API CALL
  let allSchedules = data?.data || [];

  let relevantSchedules = allSchedules.filter(
    (schedule) => schedule.date === dateToCheck
  );

  //   NOTE ------- REPLACE ANY WITH THE PROPER INTERFACE
  const [scheduleToRender, setScheduleToRender] = useState<any>();

  useEffect(() => {
    refetch();
    setScheduleToRender(
      relevantSchedules.find(
        (schedule) => schedule.title === scheduleToDisplay?.title
      )
    );
  }, [scheduleToDisplay, data]);

  const allDesignations = scheduleToRender?.designations || [];
  const assignedEmployees = scheduleToRender?.assignedEmployees || [];

  const renderDesignations = () => {
    return allDesignations.map((designation: any) => {
      const designationName = designation.designation;
      const locations = designation.locations;

      return (
        <DesignationCard
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
      {renderDesignations()}
    </MainContainer>
  );
};

export default Content;

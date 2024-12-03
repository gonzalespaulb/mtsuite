import { FC, useEffect, useState } from "react";
import {
  BackBtn,
  BackTitleContainer,
  DownloadBtn,
  MainContainer,
  ScheduleBtn,
} from "./styles";
import { useGetAllSchedules } from "../../../../../redux/hooks/schedule";
import { useNavigate } from "react-router-dom";
import { scheduleToCSV } from "../../../../../utils/csvTemplates";
import { useEmployees } from "../../../../../redux/hooks/user";

interface ISelectedSchedule {
  date: string;
  title: string;
}

interface IControls {
  scheduleToDisplay: ISelectedSchedule | null;
  setScheduleToDisplay: Function;
}

const Controls: FC<IControls> = ({
  scheduleToDisplay,
  setScheduleToDisplay,
}) => {
  let navigate = useNavigate();

  const { data } = useGetAllSchedules();

  // NOTE ------- FROM REDUX
  const dateToCheck = scheduleToDisplay?.date;

  // NOTE ------- FROM GET API

  const allSchedules = data?.data || [];
  const fetchedEmployees = useEmployees()?.data?.data || [];

  let relevantSchedules = allSchedules.filter(
    (schedule) => schedule.date === dateToCheck
  );

  const [scheduleBtns, setScheduleBtns] = useState<string[]>([]);
  const [scheduleToRender, setScheduleToRender] = useState<any>();

  useEffect(() => {
    if (allSchedules.length > 0 && dateToCheck) {
      const schedulesForToday = allSchedules
        .filter((schedule) => schedule.date === dateToCheck)
        .map((schedule) => schedule.title);
      setScheduleBtns(schedulesForToday);
    }
  }, [allSchedules, dateToCheck]);

  useEffect(() => {
    setScheduleToRender(
      relevantSchedules.find(
        (schedule) => schedule.title === scheduleToDisplay?.title
      )
    );
  }, [scheduleToDisplay, data]);

  // NOTE --------------------------------------------------------- DOWNLOAD A PRINTABLE CSV

  const header: any[] = [
    {
      name: scheduleToRender && scheduleToRender.date,
      location: "",
      position: "",
      startTime: "",
    },
    {
      name: "",
      location: "Location",
      position: "Position",
      startTime: "Start Time",
    },
  ];

  const designationMap = () => {
    return scheduleToRender.designations
      .map((designation: any) => {
        if (!designation.isActive) return;

        const designationProfile = {
          designation: designation.designation, 
          locations: designation?.locations?.map((location: any) => location.designation) || [],
        }

        return designationProfile;
      })
      .filter((designation: any) => designation !== undefined)
      .map((designation: any) => {
        const designationHeader = {
          name: designation.designation,
          location: "",
          position: "",
          startTime: "",
        };

        let designationGroup: any[] = [designationHeader];

        for (const assigned of scheduleToRender.assignedEmployees) {
          const assignedToPush = {
            name: assigned.preferredName,
            location: assigned.location,
            position: assigned.position[0],
            startTime: assigned.startTime,
          };

          if (assigned.designation === designation.designation)
            designationGroup.push(assignedToPush);
        }
    
          const sortedByLocation = designationGroup.slice().sort((a: any, b: any) => {
            return designation.locations.indexOf(a.location) - designation.locations.indexOf(b.location); 
          })
          return sortedByLocation;
      });
  };

  const targetList = () => {
    return fetchedEmployees.map((employee) => {
      const emailIdProfile = {
        email: employee.email,
        employeeId: employee.employeeId,
        isActive: employee.isActive,
      };

      return emailIdProfile;
    });
  };

  const emailMap = () => {
    const listToCheck = targetList();
  
    const emailColumn = {
      name: "Emails",
      location: "",
      position: "",
      startTime: "",
    };

    let emailGroup: any[] = [emailColumn];

      for (const target of listToCheck || []) {

          const emailProfile = {
            name: target.email,
            location: "",
            position: "",
            startTime: "",
          };

          if(target?.isActive) {
            emailGroup.push(emailProfile);
          }
      }
    console.log(emailGroup);
    return emailGroup;
  };

  const downloadHandle = () => {
    const formatted =
      scheduleToRender &&
      [header, designationMap().flat(), emailMap().flat()].flat();
    scheduleToCSV(formatted, scheduleToRender.title);
  };

  // NOTE ----------------------------------------------------------------- RENDER SCHEDULE BTNS

  const renderScheduleBtns = () => {
    return scheduleBtns.map((scheduleTitle) => {
      return (
        <ScheduleBtn
          inView={scheduleTitle === scheduleToDisplay?.title}
          onClick={() =>
            setScheduleToDisplay({
              date: dateToCheck,
              title: scheduleTitle,
            })
          }
        >
          <span>{scheduleTitle}</span>
        </ScheduleBtn>
      );
    });
  };

  return (
    <MainContainer>
      <BackTitleContainer onClick={() => navigate("/calendar")}>
        <BackBtn />
        <span>{dateToCheck}</span>
      </BackTitleContainer>
      {renderScheduleBtns()}
      <DownloadBtn onClick={downloadHandle}/>
    </MainContainer>
  );
};

export default Controls;

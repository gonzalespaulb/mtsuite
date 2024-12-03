import { FC } from "react";
import {
  Card,
  CreatedBy,
  CreatedByContainer,
  CreationDate,
  CreatorInfo,
  EditBtn,
  InfoContainer,
  Name,
  OptionBtnsContainer,
  ProfilePicture,
  PunchTimesBtn,
  ScheduleInfo,
  TrashBtn,
  ViewArea,
  ViewBtn,
  ViewScheduleContainer,
} from "./styles";
import { formatDate, parseDate } from "../../../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addDesignation,
  addToAllAssigned,
  resetScheduleValues,
  setDate,
  setScheduleToView,
  setSelectedSchedule,
  setTitle,
} from "../../../../../redux/ScheduleSlice";
import { useHardDeleteSchedule } from "../../../../../redux/hooks/schedule";
import { useGetAllSchedulesQuery } from "../../../../../redux/api/scheduleApi";

type TLocation = string;
type TPosition =
  | "Administrator"
  | "Attendant"
  | "Foreman"
  | "Manager"
  | "Operator"
  | "Relief"
  | "Supervisor"
  | "Superuser";

interface IAssignedEmployee {
  employeeId: string;
  preferredName: string;
  position: string[];
  designation: TLocation;
  location: string;
  startTime: string;
}

interface IPosition {
  // position: string[];
  position: TPosition[];
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
  isActive: boolean;
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
  createdAt: Date;
  updatedAt: Date;
}

interface IScheduleCard {
  scheduleName: string;
  selectedDay: Date;
  createdAt: Date;
  allSchedules: ISchedule[];
  createdBy: ICreatedBy;
}

const ScheduleCard: FC<IScheduleCard> = ({
  scheduleName,
  createdAt,
  selectedDay,
  allSchedules,
  createdBy,
}) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { refetch } = useGetAllSchedulesQuery();
  const { hardDeleteSchedule } = useHardDeleteSchedule();

  const formattedDate = formatDate(selectedDay);

  const viewScheduleAction = () => {
    const scheduleToView = {
      date: formattedDate,
      title: scheduleName,
    };
    navigate("/scheduleDetail");
    dispatch(setSelectedSchedule(scheduleToView));
  };

  const [scheduleProfile] = allSchedules.filter(
    (schedule) =>
      schedule.title === scheduleName && schedule.date === formattedDate
  );

  const editScheduleAction = () => {
    dispatch(resetScheduleValues());
    dispatch(setTitle(scheduleName));
    dispatch(setDate(selectedDay));
    dispatch(addDesignation(scheduleProfile.designations));
    dispatch(addToAllAssigned(scheduleProfile.assignedEmployees));
    dispatch(setScheduleToView(scheduleProfile._id));

    navigate("/editSchedule");
  };

  const deleteScheduleAction = () => {
    hardDeleteSchedule(scheduleProfile._id);
    refetch();
  };

  return (
    <Card>
      <ScheduleInfo>
        <InfoContainer>
          <span>{scheduleName}</span>
          <CreatedBy>Created By</CreatedBy>
          <CreatedByContainer>
            <ProfilePicture employeePicture={createdBy.employeePicture || ""} />
            <CreatorInfo>
              <Name>{createdBy.preferredName}</Name>
              <CreationDate>
                {formatDate(new Date(createdAt))}
              </CreationDate>
            </CreatorInfo>
          </CreatedByContainer>
        </InfoContainer>
      </ScheduleInfo>
      <ViewArea>
        <OptionBtnsContainer>
          <EditBtn onClick={editScheduleAction} />
          <PunchTimesBtn />
          <TrashBtn onClick={deleteScheduleAction} />
        </OptionBtnsContainer>
        <ViewScheduleContainer onClick={viewScheduleAction}>
          <span>View</span>
          <ViewBtn />
        </ViewScheduleContainer>
      </ViewArea>
    </Card>
  );
};

export default ScheduleCard;

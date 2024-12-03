import {
  BackBtn,
  BackTitleContainer,
  ControlBtn,
  ControlIcon,
  DraftBtn,
  MainContainer,
  ScheduleBtn,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import {
  useEditSchedule,
  useGetAllSchedules,
} from "../../../../../redux/hooks/schedule";
import {
  resetScheduleValues,
} from "../../../../../redux/ScheduleSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Controls = () => {
  const { date, allAssignedEmployees, designations, title, scheduleToView } =
    useSelector((state: RootState) => state?.scheduleControls);

  const findScheduleById = (array: any, id: any) => {
    return array.find((schedule: any) => {
      return schedule._id === id;
    });
  };

  const [isDraft, setIsDraft] = useState(true);

  const fetchedSchedules = useGetAllSchedules().data?.data || [];

  useEffect(() => {
    if (fetchedSchedules) {
      const fullSchedule = findScheduleById(fetchedSchedules, scheduleToView);
      setIsDraft(fullSchedule?.isDraft);
    }
  }, [fetchedSchedules]);

  const formattedDate = `${date?.month ? date.month + 1 : 1}/${date?.day}/${
    date?.year
  }`;

  const { onEditSchedule } = useEditSchedule();

  // NOTE------------------------------------------------------------------------------- SEND TO DATABASE
  // NOTE------------------------------------------------------------------------------- SEND TO DATABASE
  // NOTE------------------------------------------------------------------------------- SEND TO DATABASE

  const sendEditedSchedule = () => {
    const editedSchedule = {
      designations: designations,
      assignedEmployees: allAssignedEmployees,
      isDraft,
    };
    onEditSchedule(editedSchedule, scheduleToView);
  };

  // NOTE------------------------------------------------------------------------------- SEND TO DATABASE
  // NOTE------------------------------------------------------------------------------- SEND TO DATABASE
  // NOTE------------------------------------------------------------------------------- SEND TO DATABASE

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const backToCalendar = () => {
    dispatch(resetScheduleValues());
    navigate("/calendar");
  };

  return (
    <MainContainer>
      <BackTitleContainer onClick={backToCalendar}>
        <BackBtn></BackBtn>
        <span>{formattedDate}</span>
      </BackTitleContainer>
      <ScheduleBtn>
        <span>{title}</span>
      </ScheduleBtn>
      <DraftBtn onClick={() => setIsDraft(!isDraft)} isDraft={isDraft}>
        <span>Draft</span>
      </DraftBtn>

      <ControlBtn onClick={sendEditedSchedule}>
        <span>Republish Changes</span>
        <ControlIcon />
      </ControlBtn>
    </MainContainer>
  );
};

export default Controls;

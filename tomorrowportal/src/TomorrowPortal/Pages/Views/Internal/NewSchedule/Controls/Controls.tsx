import { useState } from "react";
import {
  CalendarBtn,
  ControlBtn,
  ControlIcon,
  DraftBtn,
  EditBtn,
  InputControls,
  InputGroup,
  MainContainer,
  StaticInfo,
  TypeInput,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../../../../redux/ScheduleSlice";
import { RootState } from "../../../../../redux/store";
import { FAIL } from "../../../../../utils/status";
import { addToast } from "../../../../../redux/NotificationSlice";
import { useNewSchedule } from "../../../../../redux/hooks/schedule";

const Controls = () => {
  const { date, allAssignedEmployees, designations, title } = useSelector(
    (state: RootState) => state?.scheduleControls
  );
  const [isDraft, setIsDraft] = useState(true);
  const formattedDate = `${date?.month ? date.month + 1 : 1}/${date?.day}/${
    date?.year
  }`;
  const { onNewSchedule } = useNewSchedule();

  // NOTE------------------------------------------------------------------------------- SEND TO DATABASE
  // NOTE------------------------------------------------------------------------------- SEND TO DATABASE
  // NOTE------------------------------------------------------------------------------- SEND TO DATABASE

  const payload = {
    title,
    date: formattedDate,
    designations,
    assignedEmployees: allAssignedEmployees,
    isDraft,
  };
  // NOTE------------------------------------------------------------------------------- SEND TO DATABASE
  // NOTE------------------------------------------------------------------------------- SEND TO DATABASE
  // NOTE------------------------------------------------------------------------------- SEND TO DATABASE

  const dispatch = useDispatch();

  const [editTitle, setEditTitle] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const titleControls = () => {
    if (editTitle) {
      return (
        <TypeInput
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        />
      );
    } else {
      return (
        <StaticInfo>
          <span>{title}</span>
        </StaticInfo>
      );
    }
  };

  const titleEditEvent = () => {
    const emptyTitle = {
      status: FAIL,
      message: "Missing schedule title.",
    };
    if (editTitle && editValue !== "") {
      dispatch(setTitle(editValue));
      setEditTitle(false);
      return;
    }

    if (editValue === "") {
      dispatch(addToast(emptyTitle));
      return;
    }

    setEditTitle(true);
  };

  return (
    <MainContainer>
      <InputControls>
        <InputGroup>
          {titleControls()}
          <EditBtn editTitle={editTitle} onClick={titleEditEvent} />
        </InputGroup>
        <InputGroup>
          <StaticInfo>
            <span>{formattedDate}</span>
          </StaticInfo>
          <CalendarBtn />
        </InputGroup>
      </InputControls>
      <DraftBtn onClick={() => setIsDraft(!isDraft)} isDraft={isDraft}>
        <span>Draft</span>
      </DraftBtn>
      <ControlBtn
        onClick={() => {
          onNewSchedule(payload);
        }}
      >
        <span>Publish Schedule</span>
        <ControlIcon />
      </ControlBtn>
    </MainContainer>
  );
};

export default Controls;

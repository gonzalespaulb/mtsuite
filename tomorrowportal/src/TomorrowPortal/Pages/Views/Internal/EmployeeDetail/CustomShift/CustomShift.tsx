import { FC, useEffect, useState } from "react";
import {
  Active,
  CalendarContainer,
  CloseBtn,
  ContentContainer,
  CreateBtn,
  DateContainer,
  DateController,
  DateSelector,
  Inactive,
  MainContainer,
  MonthBtn,
  NoteContainer,
  Overlay,
  Sidebar,
  StatusContainer,
  StatusDivider,
  StatusToggle,
  TextArea,
  Title,
  TitleBar,
} from "./styles";
import { useCreateCustomShift } from "../../../../../redux/hooks/user";
import Calendar from "./Calendar/Calendar";
import { leftPrimary, rightPrimary } from "../../../assets";
import { MONTHS_LONG } from "../../../../../utils/enums";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { useDispatch } from "react-redux";
import { addToast } from "../../../../../redux/NotificationSlice";
import { missingFields } from "../../../../../utils/messages";
import { FAIL } from "../../../../../utils/status";

interface ICustomShift {
  setOpenCustomShift: Function;
}

const CustomShift: FC<ICustomShift> = ({ setOpenCustomShift }) => {
  const { currentEmployee } = useSelector(
    (state: RootState) => state?.contentControls
  );

  const [date, setDate] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [isActive, setIsActive] = useState(true);
  const [runAnimation, setRunAnimation] = useState<boolean>(false);
  const [updatedMonth, setUpdatedMonth] = useState(new Date().getMonth());

  const dispatch = useDispatch();

  const today = new Date();

  useEffect(() => {
    setRunAnimation(true);
  }, []);

  const closeCustomShift = () => {
    setRunAnimation(false);

    setTimeout(() => {
      setOpenCustomShift(false);
    }, 450);
  };

  const { onCreateCustomShift } = useCreateCustomShift();

  const customShift = {
    date,
    note,
    isActive,
  };

  const createCustomShift = () => {
    const noteFilled = note !== "";
    const dateFilled = date !== "";
    const noExistingCustomDate = !currentEmployee?.customShifts.map((shift) => shift.date).includes(date);

    const alreadyHasCustomDate = {status: FAIL, message: `There is already an existing custom shift for ${date}`};

    if(!noExistingCustomDate) {
      dispatch(addToast(alreadyHasCustomDate))
      return;
    }


    if (!noteFilled || !dateFilled) {
      dispatch(addToast({ status: FAIL, message: missingFields }));
      return;
    }

    onCreateCustomShift(customShift, currentEmployee?.employeeId || "");
    closeCustomShift();
  };

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

  return (
    <MainContainer>
      <Overlay runAnimation={runAnimation} />
      <Sidebar runAnimation={runAnimation}>
        <TitleBar>
          <Title>Custom Shift</Title>
          <CloseBtn onClick={closeCustomShift} />
        </TitleBar>
        <ContentContainer>
          <StatusContainer>
            <span>Status</span>
            <StatusToggle>
              <Active isActive={isActive} onClick={() => setIsActive(true)}>
                Active
              </Active>
              <StatusDivider />
              <Inactive isActive={isActive} onClick={() => setIsActive(false)}>
                Inactive
              </Inactive>
            </StatusToggle>
          </StatusContainer>
          <CalendarContainer>
            <DateController>
              <span>Date</span>
              <DateSelector>
                <DateContainer>
                  <span>
                    {MONTHS_LONG[displayedMonth].toUpperCase()} {displayedYear}
                  </span>
                </DateContainer>
                <MonthBtn
                  iconUrl={leftPrimary}
                  onClick={() => setUpdatedMonth(updatedMonth - 1)}
                />
                <MonthBtn
                  iconUrl={rightPrimary}
                  onClick={() => setUpdatedMonth(updatedMonth + 1)}
                />
              </DateSelector>
            </DateController>
            <Calendar
              updatedMonth={updatedMonth}
              today={today}
              clickAction={setDate}
              selectedDate={date}
            />
          </CalendarContainer>
          <NoteContainer>
            <span>Note</span>
            <TextArea
              onChange={(e) => setNote(e.target.value)}
              value={note}
              placeholder="Please state the reason for a custom shift."
            />
          </NoteContainer>
          <CreateBtn onClick={createCustomShift}>
            <span>Create Custom Shift</span>
          </CreateBtn>
        </ContentContainer>
      </Sidebar>
    </MainContainer>
  );
};

export default CustomShift;

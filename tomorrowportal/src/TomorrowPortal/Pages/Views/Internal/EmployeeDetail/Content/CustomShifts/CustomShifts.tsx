import { FC, useState } from "react";
import {
  DeleteBtn,
  InfoLabel,
  LabelBar,
  MainContainer,
  ShiftBar,
  ShiftInfo,
  Status,
} from "./styles";
import { formatDate, parseDate } from "../../../../../../utils/helpers";
import { useDeleteCustomShift } from "../../../../../../redux/hooks/user";
import { employeeData } from "../../../../../../utils/mockData";

interface ICustomShift {
  date: string;
  isActive: boolean;
  note: string;
  id: string;
}

interface ICustomShifts {
  customShifts: ICustomShift[];
  employeeId: string;
}

const CustomShifts: FC<ICustomShifts> = ({ customShifts, employeeId }) => {
  const { onDeleteCustomShift } = useDeleteCustomShift();

  const [shiftToDelete, setShiftToDelete] = useState("");
  console.log(shiftToDelete)
  const renderLabelBar = () => {
    return (
      <LabelBar>
        <InfoLabel>
          <span>Date</span>
        </InfoLabel>
        <InfoLabel>
          <span>Note</span>
        </InfoLabel>
        <InfoLabel>
          <span>Status</span>
        </InfoLabel>
      </LabelBar>
    );
  };

  const handleOnDeleteCustomShift = (shiftId: string, employeeId: string) => {
    onDeleteCustomShift(shiftId, employeeId);
  };

  const renderShiftBars = () => {
    const sortedCustomShifts = customShifts.map((shiftProfile) => {
      const sortableProfile = {
        date: parseDate(shiftProfile.date).getTime(),
        note: shiftProfile.note,
        isActive: shiftProfile.isActive,
        id: shiftProfile.id,
      };
      return sortableProfile;
    });

    const customShiftsToRender = sortedCustomShifts.sort(
      (a, b) => b.date - a.date
    );

    return customShiftsToRender.map((shift) => {
      const today = new Date().getTime();
      const formattedShiftDate = formatDate(new Date(shift.date));
      return (
        <ShiftBar
          upcomingShift={
            today < shift.date ||
            formatDate(new Date(today)) === formattedShiftDate
          }
        >
          <ShiftInfo onMouseEnter={() => setShiftToDelete(shift.id)} onMouseLeave={() => setShiftToDelete("")}>
            <span>{formattedShiftDate}</span>
          </ShiftInfo>
          <ShiftInfo onMouseEnter={() => setShiftToDelete(shift.id)} onMouseLeave={() => setShiftToDelete("")}>
            <span>{shift.note}</span>
          </ShiftInfo>
          <ShiftInfo onMouseEnter={() => setShiftToDelete(shift.id)} onMouseLeave={() => setShiftToDelete("")}>
            <Status isActive={shift.isActive}></Status>
            <DeleteBtn isDeleting={shift.id === shiftToDelete}  onClick={() => handleOnDeleteCustomShift(shift.id, employeeId)}/>
          </ShiftInfo>
        </ShiftBar>
      );
    });
  };

  return (
    <MainContainer>
      {renderLabelBar()}
      {renderShiftBars()}
    </MainContainer>
  );
};

export default CustomShifts;

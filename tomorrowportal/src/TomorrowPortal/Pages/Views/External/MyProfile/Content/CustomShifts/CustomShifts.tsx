import { FC } from "react";
import {
  InfoLabel,
  LabelBar,
  MainContainer,
  ShiftBar,
  ShiftInfo,
  Status,
} from "./styles";
import { formatDate, parseDate } from "../../../../../../utils/helpers";

interface ICustomShift {
  date: string;
  isActive: boolean;
  note: string;
  id: string;
}

interface ICustomShifts {
  customShifts: ICustomShift[];
}

const CustomShifts: FC<ICustomShifts> = ({ customShifts }) => {
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
        <ShiftBar upcomingShift={today < shift.date || formatDate(new Date(today)) === formattedShiftDate}>
          <ShiftInfo>
            <span>{formattedShiftDate}</span>
          </ShiftInfo>
          <ShiftInfo>
            <span>{shift.note}</span>
          </ShiftInfo>
          <ShiftInfo>
            <Status isActive={shift.isActive}>
            </Status>
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

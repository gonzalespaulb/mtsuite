import styled from "styled-components";
import { colors } from "../../../../../utils/colors";
import { flex } from "../../../../../utils/helpers";
import { inter } from "../../../../../utils/fonts";
import {
  clock,
  deletePrimary,
  edit,
  forwardArrowPrimary,
  plus,
} from "../../../assets";


export const MainContainer = styled.div`
  flex: 1;
  width: 100%;
  ${flex(undefined, undefined)}
  background: ${colors.secondary};

  @media (max-width: 600px) {
    ${flex(undefined, undefined, "column")}
  }
`;

export const Calendar = styled.div`
  min-width: 500px;
  padding: 16px;
  position: sticky;
  top: 83px;
  height: calc(100vh - 83px);
  border-right: 1px solid ${colors.border};

  ${flex(undefined, undefined, "column")}

  @media (max-width: 600px) {
    min-width: 100%;
    top: 65px;
    height: auto;
    position: static;
  }
`;

export const SchedulesContainer = styled.div`
  flex: 1;
  min-height: calc(100vh - 83px);
  background: ${colors.secondary};
  ${flex(undefined, undefined, "column")}

  @media (max-width: 600px) {
    width: 100%;
    min-height: auto;
  }
`;
 
export const ScheduleControls = styled.div`
  width: 100%;
  height: 83px;
  font-size: 18px;
  line-height: 18px;
  font-weight: ${inter.bold};
  ${flex("space-between", "center")}
  color: ${colors.primary};
  padding: 0 16px;

  @media (min-width: 1450px) {
    padding: 0px;
  }
`;

export const NewScheduleBtn = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 5px;
  border: 1px solid ${colors.border};
  cursor: pointer;
  background-color: ${colors.secondary};
  background-image: url(${plus});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 50%;

  transition: 0.3s ease;

  :hover {
    background-color: ${colors.border};
  }
`;

interface ControlsContainerProps {
  creatingNewSchedule: boolean;
}

export const ControlsContainer = styled.div<ControlsContainerProps>`
  width: 100%;
  height: ${(props) => (props.creatingNewSchedule ? "144px" : "83px")};
  border-bottom: 1px solid ${colors.border};
  z-index: 10;
  background: ${colors.secondary};
  position: sticky;
  top: 83px;
  overflow: hidden;
  transition: 0.3s ease;

  @media (min-width: 1450px) {
    padding: 0 20%;
  }
`;

export const InputContainer = styled.div`
  ${flex(undefined, "center")};
  height: 44px;
  width: 100%;
  background: ${colors.secondary};
  overflow: hidden;
  padding: 0 16px;

  @media (min-width: 1450px) {
    padding: 0px;
  }
`;

export const TitleInput = styled.input`
  height: 44px;
  width: 175px;
  border: none;
  padding: 0 16px;
  margin-right: 1px;
  border-radius: 10px 0 0 10px;
  background: ${colors.input};
  font-weight: ${inter.semiBold};
  color: ${colors.primary};
  font-size: 12px;
  line-height: 12px;
`;

export const CreateBtn = styled.div`
  padding: 0 16px;
  height: 44px;
  border-radius: 0 10px 10px 0;
  background: #e6eff9;
  ${flex("center", "center")}
  font-size: 12px;
  line-height: 12px;
  color: #0860c7;
  letter-spacing: 1px;
  cursor: pointer;
  font-weight: ${inter.semiBold};
`;

export const ScheduleList = styled.div`
  flex: 1;
  width: 100%;
  min-height: 100%;
  padding: 16px;
  background: #eff0f4;
  background: ${colors.secondary};
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
  grid-auto-rows: minmax(min-content, max-content);
  position: relative;

  @media (min-width: 1450px) {
    padding: 16px 20%;
  }
`;

export const WeekDayContainer = styled.div`
  width: 100%;
  ${flex()}
  background: ${colors.secondary};
  margin-bottom: 8px;
`;

export const WeekDay = styled.div`
  flex: 1;
  ${flex("center", "center")}
  padding: 8px;
  font-weight: ${inter.semiBold};
  color: ${colors.primary};
  font-size: 14px;
  line-height: 14px;
`;

export const Month = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(min-content, max-content);
  background: ${colors.secondary};
  font-weight: ${inter.semiBold};
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid ${colors.primary};
  margin-bottom 16px;
`;

interface DayContainerProps {
  today: boolean;
  pastDay: boolean;
  dayBoxColor: string;
  selected: boolean;
}

export const DayContainer = styled.div<DayContainerProps>`
  width: 100%;
  aspect-ratio: 1 /1;
  ${flex("center", "center")}
  position: relative;
  background: ${(props) => props.dayBoxColor};
  color: ${(props) => (props.today ? colors.secondary : colors.primary)};
  cursor: pointer;
  padding: 16px;
  border: ${(props) => props.selected ? `1px dashed ${colors.primary}` : "none"};

  :not(:nth-child(7n)) {
    border-right: 1px solid ${colors.primary};
  }

  :not(:nth-last-child(-n + 7)) {
    border-bottom: 1px solid ${colors.primary};
  }

    @media (max-width: 600px) {
    padding: 0px;
    
  }
`;

export const Day = styled.span``;

// NOTE -------------------------------------------------------------------- CALENDAR DAY

interface ScheduleIndicatorProps {
  today: boolean;
  hasSchedules: boolean;
}

export const ScheduleIndicator = styled.div<ScheduleIndicatorProps>`
  height: 5px;
  width: 5px;
  border-radius: 50%;
  background: ${(props) => (props.today ? colors.secondary : colors.primary)};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 250%);
  display: ${(props) => (props.hasSchedules ? "block" : "none")};
`;

// NOTE -------------------------------------------------------------------- DATE SELECTOR

export const DateSelector = styled.div`
  height: 44px;
  ${flex(undefined, "center")};
  background: #eff0f4;
  border-radius: 10px;
  overflow: hidden;
`;

export const DateContainer = styled.div`
  padding: 16px;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 1px;
  font-weight: ${inter.bold};
  ${flex("center", "center")}
  overflow: hidden;
  border-left: 1px solid ${colors.secondary};
  z-index: 1;
  background #E6EFF9;
  color: #0761C7;
`;

interface MonthBtnProps {
  iconUrl: string;
}

export const MonthBtn = styled.div<MonthBtnProps>`
  height: 100%;
  aspect-ratio: 1 / 1;
  background-image: url(${(props) => props.iconUrl});
  background-size: 15px;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

// NOTE -------------------------------------------------------------------- SCHEDULE CARD

export const Card = styled.div`
  border-radius: 5px;
  border: 1px solid ${colors.border};
  color: ${colors.primary};
  font-size: 16px;
  line-height: 16px;
  font-weight: ${inter.semiBold};
  padding: 16px;
  background: ${colors.input};
  ${flex(undefined, undefined, "column")}
`;

export const ScheduleInfo = styled.div`
  width: 100%;
  ${flex("space-between", undefined)}// background: red;
`;

export const InfoContainer = styled.div`
  flex: 1;
  ${flex(undefined, undefined, "column")}
  font-size: 18px;
`;

export const CreatedBy = styled.span`
  font-size: 12px;
  line-height: 12px;
  font-weight: ${inter.regular};
  color: ${colors.primary};
  margin-top: 16px;
  margin-bottom: 8px;
`;

export const CreatedByContainer = styled.div`
  width: 100%;
  ${flex(undefined, "center")}// background: pink;
`;

export const CreatorInfo = styled.div`
  ${flex(undefined, undefined, "column")}
`;

export const Name = styled.span`
  font-size: 14px;
  line-height: 14px;
  font-weight: ${inter.semiBold};
  margin-bottom: 8px;
`;

export const CreationDate = styled.span`
  font-size: 12px;
  line-height: 12px;
  font-weight: ${inter.medium};
`;

interface ProfilePictureProps {
  employeePicture: string;
}

export const ProfilePicture = styled.div<ProfilePictureProps>`
  height: 40px;
  width: 40px;
  background-color: ${colors.primary};
  background-image: url(${(props) => props.employeePicture});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 50%;
  margin-right: 8px;
`;

export const ViewArea = styled.div`
  width: 100%;
  margin-top: 48px;
  ${flex("space-between", "center")}
`;

export const OptionBtnsContainer = styled.div`
  ${flex(undefined, undefined)}
`;

const OptionBtns = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 5px;
  border: 1px solid ${colors.border};
  cursor: pointer;
  background-color: ${colors.secondary};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 50%;

  transition: 0.3s ease;

  :hover {
    background-color: ${colors.border};
  }
`;

export const EditBtn = styled(OptionBtns)`
  margin-right: 4px;
  background-image: url(${edit});
`;

export const PunchTimesBtn = styled(OptionBtns)`
  margin-right: 4px;
  background-image: url(${clock});
`;
export const TrashBtn = styled(OptionBtns)`
  background-image: url(${deletePrimary});
  background-size: 45%;
`;

export const ViewScheduleContainer = styled.div`
  ${flex(undefined, "center")}
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 1px;
  font-weight: ${inter.semiBold};
  overflow: hidden;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

export const ViewBtn = styled.div`
  height: 30px;
  width: 30px;
  background-image: url(${forwardArrowPrimary});
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;

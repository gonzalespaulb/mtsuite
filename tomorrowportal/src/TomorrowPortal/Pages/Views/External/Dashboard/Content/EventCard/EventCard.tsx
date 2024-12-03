import { FC } from "react";
import {
  Date,
  DateContainer,
  Day,
  EventInfo,
  FullScheduleBtn,
  InfoRow,
  Key,
  MainContainer,
  Month,
  Value,
} from "./styles";
import {
  DAYS_OF_THE_WEEK,
  MONTHS_LONG,
  POSITIONS,
} from "../../../../../../utils/enums";
import { setSelectedSchedule } from "../../../../../../redux/EmployeeViewSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { positionColors } from "../../../../../../utils/colors";
// import { positionColors } from "../../../../../../utils/colors";

interface ICardInfo {
  title: string;
  date: Date;
  designation: string;
  location: string;
  startTime: string;
  position: string[];
}

interface IEventCard {
  cardInfo: ICardInfo;
}

const EventCard: FC<IEventCard> = ({ cardInfo }) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const formattedDate = `${
    cardInfo.date.getMonth() + 1
  }/${cardInfo.date.getDate()}/${cardInfo.date.getFullYear()}`;

  const renderPositions = () => {
    const positionArrNumeric = cardInfo.position.map((position) =>
      POSITIONS.indexOf(position)
    );
    const higherPosition = Math.max(...positionArrNumeric);

    return POSITIONS[higherPosition];
  };

  const scheduleHandle = () => {
    const schedulePayload = {
      date: formattedDate,
      title: cardInfo.title,
    };
    dispatch(setSelectedSchedule(schedulePayload));
    navigate("/scheduleDetailExternal");
  };

  const positionColor = positionColors(renderPositions()) || {
    light: "",
    dark: "",
  };

  return (
    <MainContainer>
      <DateContainer positionColor={positionColor}>
        <Month>{MONTHS_LONG[cardInfo.date.getMonth()]}</Month>
        <Date>{cardInfo.date.getDate()}</Date>
        <Day>{DAYS_OF_THE_WEEK[cardInfo.date.getDay()]}</Day>
      </DateContainer>
      <EventInfo>
        <InfoRow>
          <Key>Designation:</Key>
          <Value>{cardInfo.designation}</Value>
        </InfoRow>
        <InfoRow>
          <Key>Location:</Key>
          <Value>{cardInfo.location}</Value>
        </InfoRow>
        <InfoRow>
          <Key>Start Time:</Key>
          <Value>{cardInfo.startTime}</Value>
        </InfoRow>
        <InfoRow>
          <Key>Position:</Key>
          <Value>{renderPositions()}</Value>
        </InfoRow>
      </EventInfo>
      <FullScheduleBtn onClick={scheduleHandle}>
        <span>VIEW FULL SCHEDULE</span>
      </FullScheduleBtn>
    </MainContainer>
  );
};

export default EventCard;

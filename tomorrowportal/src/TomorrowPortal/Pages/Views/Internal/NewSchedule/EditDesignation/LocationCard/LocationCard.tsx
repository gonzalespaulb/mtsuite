import { FC, useEffect, useState } from "react";
import { checkSecondary, closeSecondary } from "../../../../assets";
import {
  AddPositionBtn,
  BtnGroup,
  BtnSlider,
  Cancel,
  Confirm,
  ConfirmCancelContainer,
  Label,
  LocationName,
  MainContainer,
  Position,
  PositionBar,
  PositionContainer,
  PositionGroup,
  RemovePositionBtn,
  SelectionBtn,
  TimeContainer,
  TimePositionContainer,
} from "./styles";
import { POSITIONS } from "../../../../../../utils/enums";
import { positionColors } from "../../../../../../utils/colors";

type TPosition =
  | "Administrator"
  | "Attendant"
  | "Foreman"
  | "Manager"
  | "Operator"
  | "Relief"
  | "Supervisor"
  | "Superuser";

interface IDesignation {
  designation: string;
  startTimes: string[];
  isActive: boolean;
  locations: {
    terrain: string;
    designation: string;
    positions: {
      startTime: string;
      position: TPosition[];
    }[];
  }[];
}

interface IPositionProfile {
  startTime: string;
  position: TPosition[];
}

interface ILocationProfile {
  designation: string;
  terrain: string;
  positions: IPositionProfile[];
}

interface ILocationCard {
  startTimes: string[];
  locationProfile: ILocationProfile;
  setSelectedDesignation: Function;
  selectedDesignation: IDesignation;
}

const LocationCard: FC<ILocationCard> = ({
  locationProfile,
  startTimes,
  setSelectedDesignation,
  selectedDesignation,
}) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<TPosition[]>([]);
  const [positionsList, setPositionsList] = useState<IPositionProfile[]>(
    locationProfile.positions
  );
  const [positionToRemove, setPositionToRemove] = useState<number | null>();

  // NOTE ---------------------------------------------------------------------------------- UPDATE DESIGNATION

  const updateDesignation = () => {
    const filteredLocations = selectedDesignation.locations.filter(
      (location) => location.designation !== locationProfile.designation
    );

    const newLocationsList = selectedDesignation.locations.slice();
    const indexOfEditedLocation = newLocationsList.findIndex((location) => location.designation === locationProfile.designation);

    const thisLocation = {
      terrain: locationProfile.terrain,
      designation: locationProfile.designation,
      positions: positionsList,
    };

    newLocationsList.splice(indexOfEditedLocation, 1, thisLocation);

    const editedLocation = {
      designation: selectedDesignation.designation,
      startTimes: startTimes,
      isActive: selectedDesignation.isActive,
      locations: newLocationsList,
    };

    setSelectedDesignation(editedLocation);
  };

  useEffect(() => {
    updateDesignation();
  }, [positionsList]);

  // NOTE ---------------------------------------------------------------------------------- ADD POSITION

  const addPosition = () => {
    const positionPayload: IPositionProfile = {
      startTime: selectedTime,
      position: selectedPosition,
    };

    setPositionsList([...positionsList, positionPayload]);
    setSelectedPosition([]);
    setSelectedTime("");
    setIsAdding(false);
  };

  // NOTE ---------------------------------------------------------------------------------- RENDER CREATED POSIITONS

  const removePosition = (index: number) => {
    const newList = positionsList.slice();
    newList.splice(index, 1);
    setPositionsList(newList);
  };

  const renderCreatedPositions = () => {
    return positionsList.map((position: any, i: number) => {
      const positionsToRender = position.position;
      const timeToRender = position.startTime;

      const positionList = () => {
        return positionsToRender.map((positionToRender: any, i: number) => {
          return <Position key={i}>{positionToRender}</Position>;
        });
      };

      return (
        <PositionBar
          key={i}
          onMouseEnter={() => setPositionToRemove(i)}
          onMouseLeave={() => setPositionToRemove(null)}
        >
          <RemovePositionBtn
            isRemoving={positionToRemove === i}
            onClick={() => removePosition(i)}
          />
          <PositionGroup>{positionList()}</PositionGroup>
          <span>{timeToRender}</span>
        </PositionBar>
      );
    });
  };

  // NOTE ---------------------------------------------------------------------------------- TIME BUTTON RENDER

  const renderTimes = () => {
    return startTimes.map((time, i) => {
      return (
        <SelectionBtn
          isSelected={selectedTime === time}
          key={i}
          onClick={() => {
            setSelectedTime(time);
          }}
        >
          <span>{time}</span>
        </SelectionBtn>
      );
    });
  };

  // NOTE ---------------------------------------------------------------------------------- POSITION BUTTON RENDER

  const renderPositions = () => {
    return POSITIONS.map((position:any, i) => {
      const positionBtnClick = (position: any) => {
        if (selectedPosition.includes(position)) {
          const newPosition = selectedPosition.filter(
            (reClickedPosition) => reClickedPosition !== position
          );
          setSelectedPosition(newPosition);
        } else {
          setSelectedPosition([...selectedPosition, position]);
        }
      };

      return (
        <SelectionBtn
          key={i}
          onClick={() => positionBtnClick(position)}
          isSelected={selectedPosition.includes(position)}
        >
          <span>{position}</span>
        </SelectionBtn>
      );
    });
  };

  return (
    <MainContainer>
      <LocationName>
        <span>{locationProfile.designation}</span>
      </LocationName>
      {renderCreatedPositions()}
      <TimePositionContainer isAdding={isAdding}>
        <TimeContainer>
          <Label>Start Times</Label>
          <BtnGroup>{renderTimes()}</BtnGroup>
        </TimeContainer>
        <PositionContainer>
          <Label>Position (Select all that apply)</Label>
          <BtnGroup>{renderPositions()}</BtnGroup>
        </PositionContainer>
      </TimePositionContainer>
      <BtnSlider isAdding={isAdding}>
        <ConfirmCancelContainer>
          <Cancel iconUrl={closeSecondary} onClick={() => setIsAdding(false)} />
          <Confirm
            iconUrl={checkSecondary}
            readyToAdd={selectedTime !== "" && selectedPosition.length !== 0}
            onClick={addPosition}
          />
        </ConfirmCancelContainer>
        <AddPositionBtn onClick={() => setIsAdding(true)} isAdding={isAdding}>
          <span>Add Position +</span>
        </AddPositionBtn>
      </BtnSlider>
    </MainContainer>
  );
};

export default LocationCard;

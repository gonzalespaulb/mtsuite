import { FC, useEffect, useState } from "react";
import { TERRAIN } from "../../../../../../utils/enums";
import {
  AddContainer,
  Card,
  DesignationLocation,
  RemoveBtn,
  TerrainBtn,
  TerrainContainer,
  TimeBtn,
  PositionBtn,
  TimePositionContainer,
  TimeContainer,
  Label,
  BtnGroup,
  PositionContainer,
  BtnSlider,
  ConfirmCancelContainer,
  Cancel,
  Confirm,
  AddPositionBtn,
  PositionGroup,
  Position,
  PositionBar,
  StartTime,
  RemovePositionBtn,
  AssignTerrain,
} from "./styles";
import { POSITIONS } from "../../../../../../utils/enums";
import closeSecondary from "../../../../assets/closeSecondary.png";
import checkSecondary from "../../../../assets/checkSecondary.png";

interface IPositionProfile {
  position: string[];
  startTime: string;
}

interface ILocationProfile {
  designation: string;
  terrain: string;
  positions: IPositionProfile[];
}

interface ILocationCard {
  startTimes: string[];
  designationLocations: any[];
  setDesignationLocations: Function;
  locationProfile: ILocationProfile;
}

const LocationCard: FC<ILocationCard> = ({
  startTimes,
  designationLocations,
  setDesignationLocations,
  locationProfile,
}) => {
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<string[]>([]);
  const [selectedTerrain, setSelectedTerrain] = useState<string>("");
  const [isAdding, setIsAdding] = useState(false);
  const [positionsList, setPositionsList] = useState<any[]>([]);
  const [positionToRemove, setPositionToRemove] = useState<number | null>();
  const [runAnimation, setRunAnimation] = useState<boolean>(false);

  useEffect(() => {
    setRunAnimation(true);
  }, []);

  // NOTE ----------------------------------------------------------------- UPDATE LOCATION

  const updateLocation = () => {
    
  const updatedProperties = designationLocations.map((location) => {
      const newProfile = {
        designation: locationProfile.designation,
        terrain: selectedTerrain,
        positions: positionsList,
      };

      if (location.designation === locationProfile.designation) {
        return newProfile;
      } else return location;
    });
    setDesignationLocations(updatedProperties);
  };

  useEffect(() => {
    updateLocation();
  }, [selectedTerrain, positionsList]);

  // NOTE ----------------------------------------------------------------- REMOVE LOCATION

  const removeLocation = () => {
    const newList = designationLocations
      .slice()
      .filter(
        (location) => location.designation !== locationProfile.designation
      );
    setDesignationLocations(newList);
  };

  // NOTE ----------------------------------------------------------------- RENDER TERRAIN SELECTION

  const renderTerrainSelection = () => {
    return TERRAIN.map((terrain, i) => {
      return (
        <TerrainBtn
          key={i}
          onClick={() => setSelectedTerrain(terrain)}
          isSelected={locationProfile.terrain === terrain}
        >
          <span>{terrain}</span>
        </TerrainBtn>
      );
    });
  };

  // NOTE ---------------------------------------------------------------------------------- TIME BUTTON RENDER

  const renderTimes = () => {
    return startTimes.map((time, i) => {
      return (
        <TimeBtn
          isSelected={selectedTime === time}
          key={i}
          onClick={() => {
            setSelectedTime(time);
          }}
        >
          <span>{time}</span>
        </TimeBtn>
      );
    });
  };

  // NOTE ---------------------------------------------------------------------------------- POSITION BUTTON RENDER

  const renderPositions = () => {
    return POSITIONS.map((position, i) => {
      const positionBtnClick = (position: string) => {
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
        <PositionBtn
          key={i}
          onClick={() => positionBtnClick(position)}
          isSelected={selectedPosition.includes(position)}
        >
          <span>{position}</span>
        </PositionBtn>
      );
    });
  };

  // NOTE ---------------------------------------------------------------------------------- ADD POSITION

  const addPosition = () => {
    const positionPayload = {
      position: selectedPosition,
      startTime: selectedTime,
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
    return locationProfile.positions?.map((position: any, i: number) => {
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
          <StartTime>{timeToRender}</StartTime>
        </PositionBar>
      );
    });
  };

  // NOTE ---------------------------------------------------------------------- JSX JSX JSX JSX JSX JSX
  // NOTE ---------------------------------------------------------------------- JSX JSX JSX JSX JSX JSX
  // NOTE ---------------------------------------------------------------------- JSX JSX JSX JSX JSX JSX
  // NOTE ---------------------------------------------------------------------- JSX JSX JSX JSX JSX JSX
  // NOTE ---------------------------------------------------------------------- JSX JSX JSX JSX JSX JSX
  // NOTE ---------------------------------------------------------------------- JSX JSX JSX JSX JSX JSX

  return (
    <Card runAnimation={runAnimation}>
      <DesignationLocation>
        <span>
          {locationProfile.designation}
          <AssignTerrain>
            {selectedTerrain ? `( ${selectedTerrain} )` : "*Terrain Required"}
          </AssignTerrain>
        </span>
        <RemoveBtn onClick={removeLocation} />
      </DesignationLocation>
      <TerrainContainer>{renderTerrainSelection()}</TerrainContainer>
      <AddContainer>
        {renderCreatedPositions()}
        <TimePositionContainer isAdding={isAdding}>
          <TimeContainer>
            <Label>Start Time</Label>
            <BtnGroup>
              {startTimes.length ? (
                renderTimes()
              ) : (
                <span>*No current start times.</span>
              )}
            </BtnGroup>
          </TimeContainer>
          <PositionContainer>
            <Label>Position (Select all that apply)</Label>
            <BtnGroup>{renderPositions()}</BtnGroup>
          </PositionContainer>
        </TimePositionContainer>
        <BtnSlider isAdding={isAdding}>
          <ConfirmCancelContainer>
            <Cancel
              iconUrl={closeSecondary}
              onClick={() => setIsAdding(false)}
            />
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
      </AddContainer>
    </Card>
  );
};

export default LocationCard;

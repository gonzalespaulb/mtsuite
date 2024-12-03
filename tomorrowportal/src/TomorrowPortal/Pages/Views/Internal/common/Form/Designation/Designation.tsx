import { FC, useEffect, useState } from "react";
import LocationCard from "./LocationCard";
import {
  AddBtn,
  DesignationInput,
  DesignationInputContainer,
  DesignationsContainer,
  InputGroup,
  Label,
  MainContainer,
} from "./styles";
import { addToast } from "../../../../../../redux/NotificationSlice";
import { useDispatch } from "react-redux";
import { FAIL } from "../../../../../../utils/status";

interface IPositionProfile {
  position: string[];
  startTime: string;
}

interface ILocationProfile {
  designation: string;
  terrain: string;
  positions: IPositionProfile[];
}

interface IStateProfile {
  inputName: string;
  state: any;
  setFunc: Function;
}

interface IDesignation {
  startTimes: string[];
  stateProfile: IStateProfile;
}

const Designation: FC<IDesignation> = ({ startTimes, stateProfile }) => {

  let dispatch = useDispatch();

  const { inputName, setFunc } = stateProfile;
  const [locationName, setLocationName] = useState("");
  const [designationLocations, setDesignationLocations] = useState<ILocationProfile[]>([]);

  // NOTE -------------------------------------- UPDATED WHEN THERE ARE CHANGES TO DESIGNATION LOCATION LIST

  useEffect(() => {
    setFunc(designationLocations);
  }, [designationLocations]);

  // NOTE -------------------------------------- STARTING TEMPLATE ADDED TO THE DESIGNATION LOCATIONS LIST

  const locationTemplate = {
    designation: locationName,
    terrain: "",
    positions: [],
  };

  // NOTE -------------------------------------- RENDER ALL ACTIVE LOCATIONS

  const renderLocations = () => {
    return designationLocations.map((locationProfile) => {
      return (
        <LocationCard
          key={locationProfile.designation}
          startTimes={startTimes}
          designationLocations={designationLocations}
          setDesignationLocations={setDesignationLocations}
          locationProfile={locationProfile}
        />
      );
    });
  };

  // NOTE -------------------------------------- ADD A NEW LOCATION TO THE LIST

  const newLocationCheck = (nameToCheck: string) => {
    const alreadyExists = {
      status: FAIL,
      message: `Location for ${nameToCheck} already exists. Please use a different name.`,
    };

    const emptyName = {
      status: FAIL,
      message: "Designation location name cannot be empty.",
    };

    const designationNameList = designationLocations.map(
      (designation) => designation.designation
    );

    if (designationNameList.includes(nameToCheck)) {
      dispatch(addToast(alreadyExists));
      return false;
    }

    if (nameToCheck === "") {
      dispatch(addToast(emptyName));
      return false;
    } else return true;
  };

  // NOTE -------------------------------------- CREATE NEW LOCATION

  const createNewLocation = () => {
    if (newLocationCheck(locationTemplate.designation)) {
      setDesignationLocations([...designationLocations, locationTemplate]);
    }
    setLocationName("");
  };

  return (
    <MainContainer>
      <Label>{inputName}</Label>
      <InputGroup>
        <DesignationInputContainer>
          <DesignationInput
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="Top | Office | Burn Side"
            value={locationName}
          />
          <AddBtn onClick={createNewLocation} />
        </DesignationInputContainer>
        {designationLocations.length > 0 ? (
          <DesignationsContainer>{renderLocations()}</DesignationsContainer>
        ) : (
          <></>
        )}
      </InputGroup>
    </MainContainer>
  );
};

export default Designation;

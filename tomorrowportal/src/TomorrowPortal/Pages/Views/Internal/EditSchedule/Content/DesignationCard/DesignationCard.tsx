import { FC } from "react";
import { Card, DesignationNameContainer, EditBtn } from "../styles";
import Location from "./Location";
import {
  setOpenDesignationEdit,
  setDesignationToEdit,
} from "../../../../../../redux/ScheduleSlice";
import { useDispatch } from "react-redux";
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

interface IPosition {
  position: string[];
  startTime: string;
}

interface ILocation {
  designation: string;
  positions: IPosition[];
  terrain: string;
}

interface IDesignationCard {
  locations: ILocation[];
  designation: IDesignation;
  designationId: string;
}

const DesignationCard: FC<IDesignationCard> = ({ locations, designation }) => {
  const dispatch = useDispatch();

  const editDesigation = () => {
    dispatch(setOpenDesignationEdit(true));
    dispatch(setDesignationToEdit(designation.designation));
  };

  const renderLocations = () => {
    return locations?.map((location, i) => {
      const locationName = location.designation;
      const terrain = location.terrain;
      const positions = location.positions;

      return (
        <Location
          designationName={designation.designation}
          locationName={locationName}
          terrain={terrain}
          positions={positions}
          key={i}
          designationStatus={designation.isActive}
        />
      );
    });
  };

  return (
    <Card isActive={designation.isActive}>
      <DesignationNameContainer>
        <span>{designation.designation}</span>
        <EditBtn onClick={editDesigation} />
      </DesignationNameContainer>
      {renderLocations()}
    </Card>
  );
};

export default DesignationCard;

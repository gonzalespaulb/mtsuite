import { FC } from "react";
import { Card, DesignationNameContainer } from "../styles";
import Location from "./Location";

interface IAssignedEmployee {
  employeeId: string;
  preferredName: string;
  position: string[];
  designation: string;
  location: string;
  startTime: string;
  punchTimes: null;
  totalHours: number;
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
  designationName: string;
  locations: ILocation[];
  assignedEmployees: IAssignedEmployee[];
  designationStatus: boolean
}

const DesignationCard: FC<IDesignationCard> = ({
  designationName,
  locations,
  assignedEmployees,
  designationStatus,
}) => {
  const renderLocations = () => {
    return locations?.map((location, i) => {
      const locationName = location.designation;

      return (
        <Location
          locationName={locationName}
          assignedEmployees={assignedEmployees}
          designationName={designationName}
        />
      );
    });
  };

  return (
    <Card isActive={designationStatus}>
      <DesignationNameContainer>
        <span>{designationName}</span>
      </DesignationNameContainer>
      {renderLocations()}
    </Card>
  );
};

export default DesignationCard;

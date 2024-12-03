import { FC } from "react";
import {
  AssignEmployeeContainer,
  EmployeeInfoContainer,
  EmployeeName,
  LocationName,
  LocationsContainer,
  NameContainer,
  Position,
  Time,
  TimeContainer,
} from "../styles";
import { positionColors } from "../../../../../../utils/colors";
import { POSITIONS } from "../../../../../../utils/enums";

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

interface ILocation {
  locationName: string;
  assignedEmployees: IAssignedEmployee[];
  designationName: string;
}

const Location: FC<ILocation> = ({
  locationName,
  assignedEmployees,
  designationName,
}) => {
  const filteredEmployees = assignedEmployees.filter(
    (employee) =>
      employee.designation === designationName &&
      employee.location === locationName
  );

  const renderAssignedemployees = () => {
    const positionRender = (positionArr: string[]) => {
      return positionArr.map((position: string) => {
        return <Position>{position}</Position>;
      });
    };

    return filteredEmployees.map((employee) => {
      const positionArrNumeric = employee.position.map((position) =>
        POSITIONS.indexOf(position)
      );
      const higherPosition = Math.max(...positionArrNumeric);

      const positionColor = positionColors(POSITIONS[higherPosition]) || {
        light: "",
        dark: "",
      };

      return (
        <AssignEmployeeContainer>
          <TimeContainer>
            <Time>{employee.startTime}</Time>
          </TimeContainer>
          <EmployeeInfoContainer>
            <NameContainer positionColor={positionColor}>
              <EmployeeName>{employee.preferredName}</EmployeeName>
            </NameContainer>
            {positionRender(employee.position)}
          </EmployeeInfoContainer>
        </AssignEmployeeContainer>
      );
    });
  };

  return (
    <LocationsContainer>
      <LocationName>
        <span>{locationName}</span>
      </LocationName>
      {renderAssignedemployees()}
    </LocationsContainer>
  );
};

export default Location;

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
      return (
        <AssignEmployeeContainer>
          <TimeContainer>
            <Time>{employee.startTime}</Time>
          </TimeContainer>
          <EmployeeInfoContainer>
            <NameContainer>
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

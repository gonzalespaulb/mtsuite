import { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  AddBtn,
  AssignBtn,
  LocationName,
  LocationsContainer,
  Position,
  PositionListContainer,
  TimeContainer,
  Time,
  BtnCount,
  AssignEmployeeContainer,
  EmployeeInfoContainer,
  EmployeeName,
  NameContainer,
  RemovePosition,
} from "../styles";
import {
  setOpenEdit,
  validatePosition,
  assignEmployee,
  removeFromAllAssigned,
  setLocationToAssign,
} from "../../../../../../redux/ScheduleSlice";
import { useDispatch, useSelector } from "react-redux";
import { POSITIONS } from "../../../../../../utils/enums";
import { RootState } from "../../../../../../redux/store";

interface IAssignedEmployee {
  preferredName: string;
  employeeId: string;
  position: string[];
  startTime: string;
}

interface IPositionProfile {
  position: string;
  startTime: string;
  count: number;
}

interface IPosition {
  position: string[];
  startTime: string;
}

interface ILocation {
  locationName: string;
  positions: IPosition[];
  terrain: string;
  designationName: string;
  designationStatus: boolean;
}

const Location: FC<ILocation> = ({
  locationName,
  positions,
  terrain,
  designationName,
  designationStatus,
}) => {
  const [stringifiedBtns, setStringifiedBtns] = useState<IPositionProfile[]>(
    []
  );

  const {
    currentEmployee,
    positionToValidate,
    allAssignedEmployees,
    fetchedEmployees,
    currentDesignation,
    currentLocation,
  } = useSelector((state: RootState) => state?.scheduleControls);

  const dispatch = useDispatch();

  const [assignedEmployees, setAssignedEmployees] = useState<
    IAssignedEmployee[]
  >([]);
  const [assignedPositions, setAssignedPositions] = useState<string[]>([]);
  const [positionToRemove, setPositionToRemove] = useState<string>("");

  //   NOTE ---------------------------------------------------- REASSIGN POSITIONS AND EMPLOYEES FROM EXISTING SCHEDULES

  useEffect(() => {
    const existingAssignedPositions = allAssignedEmployees
      .filter(
        (employee) =>
          employee.designation === designationName &&
          employee.location === locationName
      )
      .map((employee) => {
        return `${employee.position}${employee.startTime}`;
      });
    const existingAssignedEmployees = allAssignedEmployees.filter(
      (employee) =>
        employee.designation === designationName &&
        employee.location === locationName
    );

    setAssignedPositions(existingAssignedPositions);
    setAssignedEmployees(existingAssignedEmployees);
  }, []);

  //   NOTE ---------------------------------------------------- ASSIGN CONTROLS

  /*
    1. If an employee is selected from edit to be assigned

    2. Check if this current location is where they are supposed to be assigned to.

    3. If this current location and the location in redux matches

    4. Send the assigned employee to the current location's list of assigned employee to check how many more btns need to be filled

    5. Reset the employee assignment and position to validate
  */

  useEffect(() => {
    const localLocation = `${designationName}${locationName}`;
    const reduxLocation = `${currentDesignation}${currentLocation}`;

    if (currentEmployee && localLocation === reduxLocation) {
      const employeeProfile = fetchedEmployees.find(
        (employee) => employee.employeeId === currentEmployee
      );

      const employee = {
        preferredName: employeeProfile?.preferredName,
        employeeId: employeeProfile?.employeeId,
        startTime: positionToValidate?.startTime || "",
        position: positionToValidate?.position || [],
      };

      setAssignedEmployees([...assignedEmployees, employee]);
      setAssignedPositions([
        ...assignedPositions,
        `${employee.position}${employee.startTime}`,
      ]);
      dispatch(assignEmployee(null));
      dispatch(validatePosition(null));
    }
  }, [currentEmployee]);

  //   NOTE ---------------------------------------------------- STRINGIFY POSITIONS TO COMPARE STRING ARRAYS

  /*
    1. Loop through each position in the location's position list

    2. Stringify the position array for comparison use

    3. Add it to the stringified positions array
  */

  let stringifiedPositions: IPositionProfile[] = [];

  for (const position of positions) {
    const positionString = position.position.toString();
    const startTime = position.startTime;

    const positionProfile = {
      position: positionString,
      startTime,
      count: 1,
    };

    stringifiedPositions.push(positionProfile);
  }

  //   NOTE ---------------------------------------------------- CONSOLIDATES POSITIONS THAT ARE THE SAME TIME AND POSITION

  /*
    1. Loop through the stringified positions array above

    2. For each position profile check if it exists in the consolidated positions array

    3. If it doesn't exist add it and if it does update it's button count

    4. After looping through all stringified positions profile set the state for btn render to all positions with update btn count
  */

  let consolidatedPositions: IPositionProfile[] = [];

  for (const positionProfile of stringifiedPositions) {
    const positionToCheck = positionProfile.position;
    const startTimeToCheck = positionProfile.startTime;

    const doesPositionExist = consolidatedPositions.find(
      (position) =>
        position.position === positionToCheck &&
        position.startTime === startTimeToCheck
    );

    if (!doesPositionExist) {
      consolidatedPositions.push(positionProfile);
    } else doesPositionExist.count++;
  }

  useEffect(() => {
    setStringifiedBtns(consolidatedPositions);
  }, [positions]);

  //   NOTE ---------------------------------------------------- PARSE ALL POSITIONS BACK TO ARRAY

  /*
    1. Map through the assignBtnsToRender state

    2. For each position profile, cross check the stringified position property with the assignedPositions state

    3. If a position matches reduce it's button count by 1

    4. Create a new profile with parsed position and a new count
  */

  const assignBtnsToRender = stringifiedBtns?.map((positionProfile) => {
    const positionToCheck = `${positionProfile.position}${positionProfile.startTime}`;
    let currentCount = positionProfile.count;

    for (const position of assignedPositions) {
      if (positionToCheck === position) {
        currentCount--;
      }
    }

    const newProfile = {
      position: positionProfile.position.split(","),
      startTime: positionProfile.startTime,
      count: currentCount,
    };

    return newProfile;
  });

  //   NOTE ---------------------------------------------------- RENDER ASSIGN BTNS

  const renderAssignBtns = () => {
    const positionRender = (positionArr: string[]) => {
      return positionArr.map((position: string, i) => {
        return <Position key={uuidv4()}>{position}</Position>;
      });
    };

    return assignBtnsToRender.map((btn) => {
      const positionArrNumeric = btn.position.map((position) =>
        POSITIONS.indexOf(position)
      );
      const higherPosition = Math.max(...positionArrNumeric);

      const positionToCheck = {
        higherPosition,
        position: btn.position,
        terrain: terrain,
        startTime: btn.startTime,
      };

      const checkPosition = () => {
        if (!designationStatus) return;
        dispatch(validatePosition(positionToCheck));
        dispatch(setOpenEdit(true));
        dispatch(setLocationToAssign([designationName, locationName]));
      };

      return (
        <AssignBtn key={uuidv4()} isVisible={btn.count > 0}>
          <TimeContainer>
            <Time>{btn.startTime}</Time>
          </TimeContainer>
          <PositionListContainer>
            {positionRender(btn.position)}
          </PositionListContainer>
          <AddBtn onClick={checkPosition} isActive={designationStatus}>
            <BtnCount>
              <span>{btn.count}</span>
            </BtnCount>
          </AddBtn>
        </AssignBtn>
      );
    });
  };

  //   NOTE ---------------------------------------------------- RENDER ASSIGNED EMPLOYEES

  const renderAssignedEmployees = () => {
    const positionRender = (positionArr: string[]) => {
      return positionArr.map((position: string) => {
        return <Position key={uuidv4()}>{position}</Position>;
      });
    };

    return assignedEmployees?.map((employee) => {
      const employeeProfile = fetchedEmployees.find(
        (employeeProfile) => employeeProfile.employeeId === employee.employeeId
      );
      return (
        <AssignEmployeeContainer
          key={locationName + employee.employeeId}
          onMouseEnter={() => setPositionToRemove(employee.employeeId)}
          onMouseLeave={() => setPositionToRemove("")}
        >
          <RemovePosition
            isRemoving={positionToRemove === employee.employeeId}
            onClick={() => removePosition(employee)}
          />
          <TimeContainer>
            <Time>{employee.startTime}</Time>
          </TimeContainer>
          <EmployeeInfoContainer>
            <NameContainer>
              <EmployeeName>{employeeProfile?.preferredName}</EmployeeName>
            </NameContainer>
            {positionRender(employee.position)}
          </EmployeeInfoContainer>
        </AssignEmployeeContainer>
      );
    });
  };

  // NOTE ------------ BRING BACK BTN FOR ADDING
  const removePosition = (employee: any) => {
    const assignedPositionToRemove = assignedPositions.indexOf(
      `${employee.position.toString()}${employee.startTime}`
    );

    const newAssignedPositionArr = assignedPositions.slice();
    newAssignedPositionArr.splice(assignedPositionToRemove, 1);
    setAssignedPositions(newAssignedPositionArr);

    const newLocalAssignedEmployeeArr = assignedEmployees.filter(
      (assignedEmployee) => {
        if (assignedEmployee.employeeId !== employee.employeeId) {
          return assignedEmployee;
        }
      }
    );

    setAssignedEmployees(newLocalAssignedEmployeeArr);

    // NOTE ------------ REMOVE FROM REDUX ASSIGNED LIST AND BRINGS BACK EMPLOYEE TO EDIT SIDEBAR

    const newAllAssignedEmployees = allAssignedEmployees.filter(
      (assignedEmployee) => {
        if (assignedEmployee.employeeId !== employee.employeeId) {
          return assignedEmployee;
        }
      }
    );
    dispatch(removeFromAllAssigned(newAllAssignedEmployees));
  };

  // NOTE ------------ REMOVE ALL IF DESIGNATION IS INACTIVE

  const removeAllAssignedInactive = () => {
    const newAllAssignedEmployees = allAssignedEmployees.filter(
      (employee) => employee.designation !== designationName
    );

    setAssignedEmployees([]);
    setAssignedPositions([]);
    dispatch(removeFromAllAssigned(newAllAssignedEmployees));
  };

  useEffect(() => {
    if (!designationStatus) {
      removeAllAssignedInactive();
    }
  }, [designationStatus]);

  return (
    <LocationsContainer isActive={designationStatus}>
      <LocationName>
        <span>{locationName}</span>
      </LocationName>
      {renderAssignedEmployees()}
      {renderAssignBtns()}
    </LocationsContainer>
  );
};

export default Location;

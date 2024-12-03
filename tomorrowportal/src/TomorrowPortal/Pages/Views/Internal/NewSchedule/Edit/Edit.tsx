import { useEmployees } from "../../../../../redux/hooks/user";
import {
  CloseBtn,
  EmployeeContainer,
  EmployeeList,
  IconContainer,
  MainContainer,
  Overlay,
  Sidebar,
  Title,
  TitleBar,
  Dropdown,
  Add,
} from "./styles";
import { DAYS_OF_THE_WEEK, POSITIONS } from "../../../../../utils/enums";
import { FC, useEffect, useState } from "react";
import {
  addToAllAssigned,
  assignEmployee,
  validatePosition,
  setOpenEdit,
  setLocationToAssign,
} from "../../../../../redux/ScheduleSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { Alphabetize, formatDate } from "../../../../../utils/helpers";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";

// NOTE --------------------------------------------------------------------------------------- INTERFACE

interface ICustomShift {
  date: string;
  isActive: boolean;
  note: string;
  id: string;
}

interface IUser {
  firstName: any;
  lastName: any;
  preferredName: any;
  employeePosition: any;
  employeeId: any;
  email: any;
  mailingAddress: any;
  phoneNumber: any;
  terrainLimit: any;
  availableDays: any[];
  employeePicture: any;
  customShifts: ICustomShift[];
  isActive?: boolean;
}

interface IEdit {}

// NOTE --------------------------------------------------------------------------------------- INTERFACE
const Edit: FC<IEdit> = () => {
  const dispatch = useDispatch();

  const {
    positionToValidate,
    date,
    allAssignedEmployees,
    fetchedEmployees,
    currentDesignation,
    currentLocation,
  } = useSelector((state: RootState) => state?.scheduleControls);

  const [scheduleDate, setScheduleDate] = useState<Date | null>(null);

  const allEmployees = fetchedEmployees.slice();

  useEffect(() => {
    if(date) {
      const year = date.year;
      const month = date.month;
      const day = date.day;

      const dateToCheck = new Date(year, month, day);
      setScheduleDate(dateToCheck);
    }
  }, [date])

  const [runAnimation, setRunAnimation] = useState<boolean>(false);

  useEffect(() => {
    setRunAnimation(true);
  }, []);

  // NOTE ---------------------------------------------------------------------- CLOSE THE EDIT FORM

  const closeEdit = () => {
    setRunAnimation(false);
    dispatch(validatePosition(null));
    dispatch(assignEmployee(null));
    dispatch(setLocationToAssign([]));
    setTimeout(() => {
      dispatch(setOpenEdit(false));
    }, 450);
  };

  // NOTE ---------------------------------------------------------------------- SORT EMPLOYEES TO RECOMMEND

  const [recommendedToRender, setRecommendedToRender] = useState<IUser[]>([]);

  useEffect(() => {
    if(scheduleDate) {
      recommendedEmployeeSort(
        DAYS_OF_THE_WEEK[scheduleDate.getDay()],
        positionToValidate?.higherPosition || 0
      );
    }
  }, [scheduleDate]);

  const recommendedEmployeeSort = (day: string, higherPosition: number) => { 
    let employeesToRecommend: any = [];
    for (const employee of allEmployees || []) {
      const employeePosition = employee.employeePosition;
      const positionRank = POSITIONS.indexOf(employeePosition || "");
      const formattedDate = scheduleDate && formatDate(scheduleDate);
      const matchingCustomDay = employee?.customShifts?.filter((shift) => shift.date === formattedDate)[0];

      const isAvailableThatDay = employee?.availableDays?.includes(day) || formattedDate === matchingCustomDay?.date;
      const canPerformFunction = positionRank >= higherPosition;
      const isActive = employee.isActive;
      const alreadyAssigned = allAssignedEmployees
        .map((employee) => employee.employeeId)
        .includes(employee.employeeId);
      const isCustomOff = () => { 
        if(matchingCustomDay) {       
          if(!matchingCustomDay.isActive) return true;
        }
      }

      if (
        isAvailableThatDay &&
        canPerformFunction &&
        isActive &&
        !alreadyAssigned &&
        !isCustomOff()
      ) {
        employeesToRecommend.push(employee);
      }
    }

    const sortedEmployees = Alphabetize(employeesToRecommend);

    setRecommendedToRender(sortedEmployees);
  };

  // NOTE ---------------------------------------------------------------------- RENDER RECOMMENDED EMPLOYEES

  const renderRecommendedEmployees = () => {
    return recommendedToRender?.map((employee) => {
      const assignedEmployee = {
        employeeId: employee.employeeId || "",
        preferredName: employee.preferredName || "",
        position: positionToValidate?.position || [],
        designation: currentDesignation || "",
        location: currentLocation || "",
        startTime: positionToValidate?.startTime || "",
        punchTimes: null,
      };

      const assignEmployeeAction = () => {
        dispatch(assignEmployee(employee.employeeId));
        dispatch(addToAllAssigned(assignedEmployee));
        setRunAnimation(false);
        setTimeout(() => {
          dispatch(setOpenEdit(false));
        }, 450);
      };

      return (
        <EmployeeContainer key={employee.employeeId} onClick={assignEmployeeAction}>
          <span>{employee.preferredName}</span>
        </EmployeeContainer>
      );
    });
  };

  return (
    <MainContainer>
      <Overlay runAnimation={runAnimation} />
      <Sidebar runAnimation={runAnimation}>
        <TitleBar>
          <Title>Assign Employee</Title>
          <CloseBtn onClick={closeEdit} />
        </TitleBar>
        <EmployeeList>{renderRecommendedEmployees()}</EmployeeList>
      </Sidebar>
    </MainContainer>
  );
};

export default Edit;

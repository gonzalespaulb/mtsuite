import {
  BackBtn,
  BackContainer,
  ContactContainer,
  ContactIcon,
  ContactInfo,
  ControlBar,
  Day,
  EditBtn,
  EmpInfo,
  EmpStats,
  EmployeeId,
  EmployeePicture,
  FullName,
  Information,
  InformationLabel,
  LabelContainer,
  MainContainer,
  NameIdPictureContainer,
  NewCustomShiftBtn,
  Position,
  StatContainer,
  StatLabel,
  Statistics,
  Status,
  TerrainLimit,
  Test,
  TestContainer,
  TrashBtn,
  WeekContainer,
} from "./styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { FC, useState } from "react";
import { emailPrimary, homePrimary, phonePrimary } from "../../../assets";
import { DAYS_OF_THE_WEEK, TERRAIN } from "../../../../../utils/enums";
import { positionColors } from "../../../../../utils/colors";
import AssignmentHistory from "./AssignmentHistory/AssignmentHistory";
import CustomShifts from "./CustomShifts/CustomShifts";
import { useNavigate } from "react-router-dom";
import { useDelete } from "../../../../../redux/hooks/user/useDelete";

interface IContent {
  setOpenEdit: Function;
  setOpenCustomShift: Function;
}

const Content: FC<IContent> = ({ setOpenEdit, setOpenCustomShift }) => {
  const { currentEmployee } = useSelector(
    (state: RootState) => state?.contentControls
  );

  const { deleteUser } = useDelete();

  const employeeDetails = {
    fullName:
      `${currentEmployee?.firstName} ${currentEmployee?.lastName}` || "",
    preferredName: currentEmployee?.preferredName || "",
    employeeId: currentEmployee?.employeeId || "",
    email: currentEmployee?.email || "",
    phoneNumber: currentEmployee?.phoneNumber || "",
    mailingAddress: currentEmployee?.mailingAddress || "",
    customShifts: currentEmployee?.customShifts || [],
    terrainLimit: currentEmployee?.terrainLimit || 0,
    availableDays: currentEmployee?.availableDays || [],
    employeePosition: currentEmployee?.employeePosition || "",
    isActive: currentEmployee?.isActive || false,
    employeePicture: currentEmployee?.employeePicture || "",
  };

  const {
    fullName,
    preferredName,
    employeeId,
    email,
    phoneNumber,
    mailingAddress,
    customShifts,
    terrainLimit,
    availableDays,
    employeePosition,
    isActive,
    employeePicture,
  } = employeeDetails;

  const [triggerConfirmation, setTriggerConfirmation] =
    useState<boolean>(false);

  let navigate = useNavigate();

  const renderNameIdPictureContainer = () => {
    return (
      <NameIdPictureContainer>
        <EmployeePicture employeePicture={employeePicture} />
        <FullName>
          {fullName} ({preferredName})
        </FullName>
        <EmployeeId>{employeeId}</EmployeeId>
      </NameIdPictureContainer>
    );
  };

  const renderContactContainer = () => {
    return (
      <ContactContainer>
        <ContactInfo>
          <ContactIcon iconUrl={phonePrimary} />
          <Information>{phoneNumber}</Information>
        </ContactInfo>
        <ContactInfo>
          <ContactIcon iconUrl={emailPrimary} />
          <Information>{email}</Information>
        </ContactInfo>
        <ContactInfo>
          <ContactIcon iconUrl={homePrimary} />
          <Information>{mailingAddress}</Information>
        </ContactInfo>
      </ContactContainer>
    );
  };

  const renderAvailability = () => {
    const renderDays = () => {
      return DAYS_OF_THE_WEEK.map((day) => {
        const firstLetter = day.charAt(0);
        return (
          <Day isWorking={availableDays.includes(day)}>
            <span>{firstLetter}</span>
          </Day>
        );
      });
    };

    return <WeekContainer>{renderDays()}</WeekContainer>;
  };

  const renderTerrainLimit = () => {
    return (
      <TerrainLimit>
        <span>{TERRAIN[terrainLimit]}</span>
      </TerrainLimit>
    );
  };

  const renderPosition = () => {
    return (
      <Position bgColor={positionColors(employeePosition)?.light || ""}>
        <span>{employeePosition}</span>
      </Position>
    );
  };

  const renderStatus = () => {
    return (
      <Status isActive={isActive}>
        <span>{isActive ? "Active" : "Inactive"}</span>
      </Status>
    );
  };

  const renderControlBar = () => {
    return (
      <ControlBar>
        <BackContainer onClick={() => navigate("/employees")}>
          <BackBtn />
          <span>Back</span>
        </BackContainer>
        <TrashBtn onClick={() => deleteUser(employeeId) || "0"}/>
        <EditBtn onClick={() => setOpenEdit(true)} />
      </ControlBar>
    );
  };

  return (
    <MainContainer>
      <EmpInfo>
        {renderNameIdPictureContainer()}
        <InformationLabel>Contact</InformationLabel>
        {renderContactContainer()}
        <InformationLabel>Availability</InformationLabel>
        {renderAvailability()}
        <InformationLabel>Terrain Limitation</InformationLabel>
        {renderTerrainLimit()}
        <InformationLabel>Position</InformationLabel>
        {renderPosition()}
        <InformationLabel>Status</InformationLabel>
        {renderStatus()}
      </EmpInfo>
      {renderControlBar()}
      <EmpStats>
        <Statistics>
          <StatContainer>
            <LabelContainer>
              <StatLabel>Assignment History</StatLabel>
            </LabelContainer>
            <AssignmentHistory employeeId={employeeId} />
          </StatContainer>
          <StatContainer>
            <LabelContainer>
              <StatLabel>Custom Shifts</StatLabel>
              <NewCustomShiftBtn onClick={() => setOpenCustomShift(true)}/>
            </LabelContainer>
            <CustomShifts customShifts={customShifts} employeeId={employeeId}/>
          </StatContainer>
        </Statistics>
      </EmpStats>
    </MainContainer>
  );
};

export default Content;

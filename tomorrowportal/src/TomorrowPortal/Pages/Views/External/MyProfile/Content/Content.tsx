import { useSelector } from "react-redux";
import {
    ContactContainer,
  ContactIcon,
  ContactInfo,
  Day,
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
  Position,
  StatContainer,
  StatLabel,
  Statistics,
  Status,
  TerrainLimit,
  WeekContainer,
} from "./styles";
import { RootState } from "../../../../../redux/store";
import { emailPrimary, homePrimary, phonePrimary } from "../../../assets";
import { DAYS_OF_THE_WEEK, TERRAIN } from "../../../../../utils/enums";
import { positionColors } from "../../../../../utils/colors";
import CustomShifts from "./CustomShifts/CustomShifts";

const Content = () => {
  const {
    currentEmployee,
    employeeToDisplay,
    relevantSchedules,
    allSchedules,
  } = useSelector((state: RootState) => state?.employeeViewControls);

  const employeeDetails = {
    fullName:
      `${employeeToDisplay?.firstName} ${employeeToDisplay?.lastName}` || "",
    preferredName: employeeToDisplay?.preferredName || "",
    employeeId: employeeToDisplay?.employeeId || "",
    email: employeeToDisplay?.email || "",
    phoneNumber: employeeToDisplay?.phoneNumber || "",
    mailingAddress: employeeToDisplay?.mailingAddress || "",
    customShifts: employeeToDisplay?.customShifts || [],
    terrainLimit: employeeToDisplay?.terrainLimit || 0,
    availableDays: employeeToDisplay?.availableDays || [],
    employeePosition: employeeToDisplay?.employeePosition || "",
    isActive: employeeToDisplay?.isActive || false,
    employeePicture: employeeToDisplay?.employeePicture || "",
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
      <EmpStats>
        <Statistics>
        <StatContainer>
            <LabelContainer>
              <StatLabel>Custom Shifts</StatLabel>
            </LabelContainer>
            <CustomShifts customShifts={customShifts} />
          </StatContainer>
        </Statistics>
      </EmpStats>
    </MainContainer>
  );
};

export default Content;

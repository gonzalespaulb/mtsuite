import { FC, useEffect, useState } from "react";
import {
  CloseBtn,
  EditForm,
  Input,
  InputContainer,
  Label,
  MainContainer,
  Overlay,
  Sidebar,
  Title,
  TitleBar,
  Position,
  PositionText,
  PositionIndicator,
  DropDownContainer,
  DropDownBtn,
  SelectedPositionContainer,
  SelectedPosition,
  PositionsContainer,
  Selection,
  SelectionText,
  BtnGroup,
  ControlsContainer,
  SaveChanges,
  BtnText,
  DiscardChanges,
  ChangePictureContainer,
  ProfilePicture,
  EditBtn,
  StatusContainer,
  ActiveContainer,
  Active,
  InactiveContainer,
  Inactive,
  Divider,
  FileInput,
} from "./styles";
import {
  DAYS_OF_THE_WEEK,
  POSITIONS,
  TERRAIN,
} from "../../../../../utils/enums";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import Confirmation from "../../common/Confirmation/Confirmation";
import { editDiscardWarning } from "../../../../../utils/messages";
import { useEdit } from "../../../../../redux/hooks/user/useEdit";
import { TPosition } from "../../../../../utils/types";

interface IEdit {
  setOpenEdit: Function;
}

const Edit: FC<IEdit> = ({ setOpenEdit }) => {
  const { currentEmployee } = useSelector(
    (state: RootState) => state?.contentControls
  );
  const { editUser, isSuccess } = useEdit();

  // NOTE ---------------------------------------------------------------------- POP IN ANIMATION STATE

  useEffect(() => {
    setRunAnimation(true);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      closeEdit();
    }
  }, [isSuccess]);

  // NOTE ---------------------------------------------------------------------- POP IN ANIMATION STATE

  const [runAnimation, setRunAnimation] = useState(false);

  // NOTE ---------------------------------------------------------------------- POSITIONS DROP DOWN STATE

  const [openPositions, setOpenPositions] = useState(false);

  // NOTE ---------------------------------------------------------------------- INPUT STATES

  const [isActive, setIsActive] = useState(currentEmployee?.isActive);
  const [employeePosition, setEmployeePosition] = useState<TPosition | string>(
    currentEmployee?.employeePosition || ""
  );
  const [terrainLimit, setTerrainLimit] = useState<number>(
    currentEmployee?.terrainLimit || 0
  );
  const [availableDays, setAvailableDays] = useState<string[]>(
    currentEmployee?.availableDays || [""]
  );
  const [firstName, setFirstName] = useState<string>(
    currentEmployee?.firstName || ""
  );
  const [lastName, setLastName] = useState<string>(
    currentEmployee?.lastName || ""
  );
  const [preferredName, setPreferredName] = useState<string>(
    currentEmployee?.preferredName || ""
  );
  const [email, setEmail] = useState<string>(currentEmployee?.email || "");
  const [employeeId, setEmployeeId] = useState<string>(
    currentEmployee?.employeeId || ""
  );
  const [mailingAddress, setMailingAddress] = useState<string>(
    currentEmployee?.mailingAddress || ""
  );
  const [phoneNumber, setPhoneNumber] = useState<string>(
    currentEmployee?.phoneNumber || ""
  );
  const [employeePicture, setEmployeePicture] = useState<any>(
    currentEmployee?.employeePicture
  );

  // NOTE ---------------------------------------------------------------------- TRIGGER CONFIRMATION POP UP

  const [triggerConfirmation, setTriggerConfirmation] = useState(false);

  // NOTE ---------------------------------------------------------------------- CLOSE THE EDIT FORM

  const closeEdit = () => {
    setRunAnimation(false);
    setTimeout(() => {
      setOpenEdit(false);
    }, 700);
  };

  // NOTE ---------------------------------------------------------------------- DROP DOWN INPUT

  const renderDropDown = () => {
    const renderPositions = () => {
      return POSITIONS.map((positionName, i) => {
        return (
          <Position
            key={i}
            onClick={() => {
              setEmployeePosition(positionName);
              setOpenPositions(false);
            }}
          >
            <PositionText>{positionName}</PositionText>
            <PositionIndicator
              positionName={positionName}
              selectedPosition={employeePosition}
            />
          </Position>
        );
      });
    };

    return (
      <InputContainer>
        <Label>Employee Position</Label>
        <DropDownContainer openPositions={openPositions}>
          <DropDownBtn onClick={() => setOpenPositions(!openPositions)} />
          <SelectedPositionContainer>
            <SelectedPosition>{employeePosition}</SelectedPosition>
          </SelectedPositionContainer>
          <PositionsContainer>{renderPositions()}</PositionsContainer>
        </DropDownContainer>
      </InputContainer>
    );
  };

  // NOTE ---------------------------------------------------------------------- TERRAIN LIMITATIONS

  const renderTerrainBtns = () => {
    return TERRAIN.map((level, i) => {
      return (
        <Selection
          key={i}
          onClick={() => setTerrainLimit(i)}
          isSelected={terrainLimit === i}
        >
          <SelectionText>{level}</SelectionText>
        </Selection>
      );
    });
  };

  // NOTE ---------------------------------------------------------------------- AVAILABILITY

  const renderDayBtns = () => {
    return DAYS_OF_THE_WEEK.map((day, i) => {
      const dayBtnClick = (day: string) => {
        if (availableDays.includes(day)) {
          const newDays = availableDays.filter(
            (reClickedDay) => reClickedDay !== day
          );
          setAvailableDays(newDays);
        } else {
          setAvailableDays([...availableDays, day]);
        }
      };

      return (
        <Selection
          key={i}
          onClick={() => dayBtnClick(day)}
          isSelected={availableDays.includes(day)}
        >
          <SelectionText>{day.charAt(0)}</SelectionText>
        </Selection>
      );
    });
  };

  // NOTE ---------------------------------------------------------------------- EDIT PAYLOAD

  const formPayload = {
    firstName,
    lastName,
    employeePicture,
    preferredName,
    employeePosition,
    employeeId,
    email,
    mailingAddress,
    phoneNumber,
    terrainLimit,
    availableDays,
    isActive: typeof isActive === "boolean" ? isActive : true,
  };

  const sendPayload = () => {
    editUser(formPayload, currentEmployee?.employeeId ?? "0");
  };

  // NOTE ---------------------------------------------------------------------- JSX JSX JSX JSX JSX JSX
  // NOTE ---------------------------------------------------------------------- JSX JSX JSX JSX JSX JSX
  // NOTE ---------------------------------------------------------------------- JSX JSX JSX JSX JSX JSX
  // NOTE ---------------------------------------------------------------------- JSX JSX JSX JSX JSX JSX
  // NOTE ---------------------------------------------------------------------- JSX JSX JSX JSX JSX JSX
  // NOTE ---------------------------------------------------------------------- JSX JSX JSX JSX JSX JSX

  return (
    <MainContainer>
      {triggerConfirmation ? (
        <Confirmation
          setTriggerConfirmation={setTriggerConfirmation}
          warningType={editDiscardWarning}
          cancelEdit={closeEdit}
        />
      ) : (
        <></>
      )}
      <Overlay runAnimation={runAnimation} />
      <Sidebar runAnimation={runAnimation}>
        <TitleBar>
          <Title>Edit Employee Profile</Title>
          <CloseBtn onClick={closeEdit} />
        </TitleBar>
        <EditForm>
          <ChangePictureContainer>
            <ProfilePicture profilePic={currentEmployee?.employeePicture || ""}>
              <EditBtn>
                <FileInput
                  type="file"
                  onChange={(e) => setEmployeePicture(e.target.files?.[0])}
                />
              </EditBtn>
            </ProfilePicture>

            <StatusContainer isActive={isActive}>
              <ActiveContainer
                isActive={isActive}
                onClick={() => setIsActive(true)}
              >
                <Active>Active</Active>
              </ActiveContainer>
              <Divider isActive={isActive} />
              <InactiveContainer
                isActive={isActive}
                onClick={() => setIsActive(false)}
              >
                <Inactive>Inactive</Inactive>
              </InactiveContainer>
            </StatusContainer>
          </ChangePictureContainer>
          <InputContainer>
            <Label>First Name</Label>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Label>Last Name</Label>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Label>Preferred Name</Label>
            <Input
              value={preferredName}
              onChange={(e) => setPreferredName(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Label>Email Address</Label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </InputContainer>
          <InputContainer>
            <Label>Employee ID</Label>
            <Input
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Label>Mailing Address</Label>
            <Input
              value={mailingAddress}
              onChange={(e) => setMailingAddress(e.target.value)}
            />
          </InputContainer>
          <InputContainer>
            <Label>Phone Number</Label>
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </InputContainer>
          {renderDropDown()}
          <InputContainer>
            <Label>Terrain Limitation</Label>
            <BtnGroup>{renderTerrainBtns()}</BtnGroup>
          </InputContainer>
          <InputContainer>
            <Label>Availability</Label>
            <BtnGroup>{renderDayBtns()}</BtnGroup>
          </InputContainer>
          <ControlsContainer>
            <SaveChanges onClick={sendPayload}>
              <BtnText>Save Changes</BtnText>
            </SaveChanges>

            <DiscardChanges onClick={() => setTriggerConfirmation(true)}>
              <BtnText>Discard</BtnText>
            </DiscardChanges>
          </ControlsContainer>
        </EditForm>
      </Sidebar>
    </MainContainer>
  );
};

export default Edit;

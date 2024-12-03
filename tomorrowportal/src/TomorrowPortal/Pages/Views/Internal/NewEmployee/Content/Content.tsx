import {
  Bubble,
  CheckList,
  CheckListLabel,
  Form,
  Input,
  InputContainer,
  Item,
  Label,
  List,
  ListItem,
  MainContainer,
  Selection,
  SelectionText,
  TerrainAvailabilityContainer,
  BtnGroup,
  Terrain,
  Availability,
  ImageDrop,
  DragTextContainer,
  DragText,
  BrowseBtn,
  BrowseBtnText,
  EmployeeImageArea,
  FormContainer,
  DropDownContainer,
  DropDownBtn,
  SelectedPositionContainer,
  SelectedPosition,
  PositionsContainer,
  Position,
  PositionText,
  PositionIndicator,
} from "./styles";
import { DAYS_OF_THE_WEEK, POSITIONS, TERRAIN } from "../../../../../utils/enums";
import { useState, useEffect, FC } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "../../../../../redux/NotificationSlice";
import { missingFields } from "../../../../../utils/messages";
import { FAIL } from "../../../../../utils/status";
import { useOnboarding } from "../../../../../redux/hooks/auth/useOnboarding";
import { TPosition } from '../../../../../utils/types';

interface IContent {
  setFormPercentage: Function;
  isFormValidated: boolean;
  setValidateForm: Function;
}

const Content: FC<IContent> = ({
  setFormPercentage,
  isFormValidated,
  setValidateForm,
}) => {
  const dispatch = useDispatch();
  const { onboarding, data: onboardingData } = useOnboarding();

  useEffect(() => {
    if (isFormValidated) {
      sendPayload();
    }
  }, [isFormValidated]);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLasttName] = useState<string>("");
  const [preferredName, setPreferredName] = useState<string>("");
  const [employeePosition, setEmployeePosition] = useState<TPosition | string>("");
  const [employeeId, setEmployeeId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mailingAddress, setMailingAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [terrainLimit, setTerrainLimit] = useState<number>(-1);
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [employeePicture, setEmployeePicture] = useState<any>();

  const [openPositions, setOpenPositions] = useState(false);

  const formElements = [
    {
      inputName: "First Name",
      isFilled: firstName.length > 0,
      setFunc: setFirstName,
    },
    {
      inputName: "Last Name",
      isFilled: lastName.length > 0,
      setFunc: setLasttName,
    },
    {
      inputName: "Preferred Name",
      isFilled: preferredName.length > 0,
      setFunc: setPreferredName,
    },
    {
      inputName: "Employee Position",
      isFilled: employeePosition.length > 0,
      setFunc: setEmployeePosition,
    },
    {
      inputName: "Employee ID",
      isFilled: employeeId.length > 0,
      setFunc: setEmployeeId,
    },
    {
      inputName: "Email Address",
      isFilled: email.length > 0,
      setFunc: setEmail,
    },
    {
      inputName: "Mailing Address",
      isFilled: mailingAddress.length > 0,
      setFunc: setMailingAddress,
    },
    {
      inputName: "Phone Number",
      isFilled: phoneNumber.length > 0,
      setFunc: setPhoneNumber,
    },
    {
      inputName: "Terrain Limitation",
      isFilled: terrainLimit !== -1,
      setFunc: setTerrainLimit,
    },
    {
      inputName: "Availability",
      isFilled: availableDays.length > 0,
      setFunc: setAvailableDays,
    },
    {
      inputName: "Employee Picture",
      isFilled: employeePicture !== undefined,
      setFunc: setEmployeePicture,
    },
  ];

  useEffect(() => {
    formElementPercentage();
  }, [formElements]);

  const formElementPercentage = () => {
    const numberOfTrue = formElements.filter(
      (element) => element.isFilled
    ).length;

    const percentFilled = Math.ceil((numberOfTrue / formElements.length) * 100);

    setFormPercentage(percentFilled);
  };

  interface IItemObj {
    inputName: string;
    isFilled: boolean;
    setFunc: Function;
  }

  const renderListItem = (itemObj: IItemObj) => {
    return (
      <ListItem>
        <Bubble isFilled={itemObj.isFilled} />
        <Item>{itemObj.inputName}</Item>
      </ListItem>
    );
  };

  const renderFormItem = (itemObj: IItemObj) => {
    return (
      <InputContainer>
        <Label>{itemObj.inputName}</Label>
        <Input onChange={(e) => itemObj.setFunc(e.target.value)}></Input>
      </InputContainer>
    );
  };

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
          <SelectionText>{day}</SelectionText>
        </Selection>
      );
    });
  };

  const formPayload = {
    firstName,
    lastName,
    preferredName,
    employeePosition,
    employeeId,
    email,
    mailingAddress,
    phoneNumber,
    terrainLimit,
    availableDays,
    employeePicture,
  };

  const validateForm = () => {
    const validate = (formEl: boolean) => formEl === true;

    const arrToValidate = formElements.map((inputEl) => inputEl.isFilled);

    return arrToValidate.every(validate);
  };

  const sendPayload = async () => {
    const failMessage = {
      status: FAIL,
      message: missingFields,
    };

    if (validateForm()) {
      await onboarding(formPayload).then(() => {
        setValidateForm(false);
      });
      // NOTE ------------ Needs a success or fail return
      // NOTE ------------ Dispatch toast based on return

      const isSuccess = onboardingData?.success;
      const isError = onboardingData?.error;

      if (isSuccess) {
        console.log(onboardingData);
      } else if (isError) {
        console.log(onboardingData);
      }
    } else {
      // NOTE ------------ Dispatch toast for validation failure
      dispatch(addToast(failMessage));
      setValidateForm(false);
    }
  };

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
        <Label>{formElements[3].inputName}</Label>
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

  return (
    <MainContainer>
      <FormContainer>
        <CheckList defaultArea={"1 / 1 / 2 / 2"} onClick={sendPayload}>
          <CheckListLabel>Employee Details</CheckListLabel>
          <List>
            {renderListItem(formElements[0])}
            {renderListItem(formElements[1])}
            {renderListItem(formElements[2])}
            {renderListItem(formElements[3])}
            {renderListItem(formElements[4])}
          </List>
        </CheckList>
        <Form defaultArea={"1 / 2 / 2 / 3"}>
          {renderFormItem(formElements[0])}
          {renderFormItem(formElements[1])}
          {renderFormItem(formElements[2])}
          {renderDropDown()}
          {renderFormItem(formElements[4])}
        </Form>

        <CheckList defaultArea={"2 / 1 / 3 / 2"}>
          <CheckListLabel>Contact Information</CheckListLabel>
          <List>
            {renderListItem(formElements[5])}
            {renderListItem(formElements[6])}
            {renderListItem(formElements[7])}
          </List>
        </CheckList>
        <Form defaultArea={"2 / 2 / 3 / 3"}>
          {renderFormItem(formElements[5])}
          {renderFormItem(formElements[6])}
          {renderFormItem(formElements[7])}
        </Form>
        <CheckList defaultArea="3 / 1 / 4 / 2">
          <CheckListLabel>Scheduling Details</CheckListLabel>
          <List>
            {renderListItem(formElements[8])}
            {renderListItem(formElements[9])}
          </List>
        </CheckList>
        <TerrainAvailabilityContainer>
          <Terrain>
            <Label>Terrain Limitation</Label>
            <BtnGroup>{renderTerrainBtns()}</BtnGroup>
          </Terrain>
          <Availability>
            <Label>Availability</Label>
            <BtnGroup>{renderDayBtns()}</BtnGroup>
          </Availability>
        </TerrainAvailabilityContainer>
        <CheckList defaultArea="4 / 1 / 5 / 2">
          <CheckListLabel>Identification</CheckListLabel>
          <List>{renderListItem(formElements[10])}</List>
        </CheckList>
        <EmployeeImageArea>
          <Label>Employee Picture</Label>
          {/* <ImageDrop>
            <DragTextContainer>
              <DragText>Drag and drop photo or</DragText>
            </DragTextContainer>
            <BrowseBtn>
              <BrowseBtnText>Browse files</BrowseBtnText>
            </BrowseBtn>
          </ImageDrop> */}
          <input
            type="file"
            onChange={(e) => setEmployeePicture(e.target.files?.[0])}
          />
        </EmployeeImageArea>
      </FormContainer>
    </MainContainer>
  );
};

export default Content;

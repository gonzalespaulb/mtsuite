import { useState } from "react";
import { eye, password, user } from "../../assets";
import {
  AppBrandContainer,
  AppLogo,
  AppName,
  GreetingContainer,
  GreetingHeading,
  GreetingSubheading,
  IconContainer,
  InputContainer,
  InputGroup,
  Label,
  MainContainer,
  OnboardContainer,
  Password,
  HandleBtn,
  HandleBtnText,
  EmployeeId,
  Weather,
  WeatherContainer,
  MountainRange,
  NoteBox,
  Note,
} from "./styles";
import { useNavigate } from "react-router-dom";
import { useResetPassword } from "../../../../redux/hooks/auth";

const Onboard = () => {
  let navigate = useNavigate();
  const { onResetPassword } = useResetPassword();

  const [uniqueCode, setUniqueCode] = useState<string>("");
  const [passwordVal, setPasswordVal] = useState<string>("");

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [passwordReset, setPasswordReset] = useState(false);

  const handleReset = async () => {
    const resetPayload = {
      uniqueCode,
      password: passwordVal,
    };

    const resetSuccess = await onResetPassword(resetPayload);

    if (resetSuccess) {
      setPasswordReset(true);
    }
  };

  const renderHandleBtn = () => {
    if (passwordReset) {
      return (
        <HandleBtn onClick={() => navigate("/")}>
          <HandleBtnText>TAKE ME TO LOG IN</HandleBtnText>
        </HandleBtn>
      );
    }
    return (
      <HandleBtn onClick={handleReset}>
        <HandleBtnText>RESET MY PASSWORD</HandleBtnText>
      </HandleBtn>
    );
  };

  const renderInputGroups = () => {
    return (
      <>
        <InputGroup>
          <Label>Unique Code</Label>
          <InputContainer>
            <EmployeeId onChange={(e) => setUniqueCode(e.target.value)} placeholder="6^h0d&!"/>
          </InputContainer>
        </InputGroup>
        <InputGroup>
          <Label>New Password</Label>
          <InputContainer>
            <Password
              type={passwordVisible ? "text" : "password"}
              onChange={(e) => setPasswordVal(e.target.value)}
              placeholder="your new password"
            />
            <IconContainer
              icon={eye}
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          </InputContainer>
        </InputGroup>
      </>
    );
  };

  const onboardNotes = {
    uniqueCodeInstructions: ""
  }

  const uniqueCodeInstructions = () => {
    return (
      <NoteBox>
        <Note><b>COPY AND PASTE</b> the unique code generated on your onboard email.</Note>
        <Note><b>CREATE A VALID PASSWORD</b> with minimum of 8 characters, containing 1 Uppercase, 1 Lowercase, 1 Number, and 1 Special Symbol.</Note>
      </NoteBox>
    )
  }

  const resetSuccess = () => {
    return (
      <NoteBox>
          <Note><b>Success!</b> Your credentials are now live and can be used to view schedules.</Note>
      </NoteBox>
    )
  }

  return (
    <MainContainer>
      <AppName>mtsüite</AppName>
      <OnboardContainer>
        <AppBrandContainer>
          <AppLogo></AppLogo>
          <WeatherContainer>
            <Weather>Snowmass Village | 39°</Weather>
          </WeatherContainer>
        </AppBrandContainer>
        <GreetingContainer>
          <GreetingHeading>
            {passwordReset ? "You're good to go!" : "Reset your password."}
          </GreetingHeading>
        </GreetingContainer>

          {passwordReset ? resetSuccess() : uniqueCodeInstructions()}
        {passwordReset ? <></> : renderInputGroups()}
        {renderHandleBtn()}
        <MountainRange/>
      </OnboardContainer>
    </MainContainer>
  );
};

export default Onboard;

import {
  GreetingContainer,
  GreetingHeading,
  GreetingSubheading,
  InputGroup,
  Label,
  SignInBtn,
  LoginContainer,
  SignInText,
  MainContainer,
  InputContainer,
  IconContainer,
  UserName,
  Password,
  AppBrandContainer,
  AppLogo,
  AppName,
  WeatherContainer,
  Weather,
  MountainRange,
  ForgotPassword,
} from "./styles";
import { useEffect, useState } from "react";

import { useLogin } from "../../../../redux/hooks/auth";
import { eye } from "../../assets";
import { useNavigate } from "react-router-dom";

const Login = () => {

  let navigate = useNavigate();

  const [emailData, setEmailData] = useState("");
  const [passwordData, setPasswordData] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const credentials = {
    email: emailData,
    password: passwordData,
  };

  const { login } = useLogin();

  const submitLogin = async () => {
    await login(credentials);
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        submitLogin();
      }
    };

    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [emailData, passwordData]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      localStorage.removeItem("CURRENT_LOGGED_IN_EMPLOYEE");
      localStorage.removeItem("LAST_VIEWED_SCHEDULE");
      localStorage.removeItem("token");
    }
  }, [token]);


  return (
    <MainContainer>
      <AppName>mtsüite</AppName>
      <LoginContainer>
        <AppBrandContainer>
          <AppLogo></AppLogo>
          <WeatherContainer>
            <Weather>Snowmass Village | 43°</Weather>
          </WeatherContainer>
        </AppBrandContainer>

        <GreetingContainer>
          <GreetingHeading>Welcome back!</GreetingHeading>
          <GreetingSubheading>Sign in to your account.</GreetingSubheading>
        </GreetingContainer>

        <InputGroup>
          <Label>Email</Label>
          <InputContainer>
            <UserName
              onChange={(e) => setEmailData(e.target.value.trim())}
              placeholder="your@email.com"
            />
          </InputContainer>
        </InputGroup>
        <InputGroup>
          <Label>Password</Label>
          <InputContainer>
            <Password
              onChange={(e) => setPasswordData(e.target.value)}
              type={passwordVisible ? "text" : "password"}
              placeholder="super secret password"
            />
            <IconContainer
              icon={eye}
              onClick={() => setPasswordVisible(!passwordVisible)}
            />
          </InputContainer>
        </InputGroup>
        <SignInBtn onClick={submitLogin}>
          <SignInText>SIGN IN</SignInText>
        </SignInBtn>
        <ForgotPassword>
          <span onClick={() => navigate("/forgotPassword")}>FORGOT PASSWORD</span>
        </ForgotPassword>
        <MountainRange />
      </LoginContainer>
    </MainContainer>
  );
};

export default Login;

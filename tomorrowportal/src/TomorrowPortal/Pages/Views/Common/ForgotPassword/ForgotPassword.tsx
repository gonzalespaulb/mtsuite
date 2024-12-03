import { useNavigate } from "react-router-dom";
import {
  BackBtn,
  BackContainer,
  GreetingContainer,
  GreetingHeading,
  GreetingSubheading,
  Input,
  InputContainer,
  InputGroup,
  Label,
  MainContainer,
  MountainRange,
  ResetBtn,
  ResetContainer,
  ResetText,
} from "./styles";
import { useEffect, useState } from "react";
import { useForgotPassword } from "../../../../redux/hooks/auth";

const ForgotPassword = () => {
  const { onForgotPassword, isLoading } = useForgotPassword();
  let navigate = useNavigate();

  const [email, setEmail] = useState("");

  const resetPassword = () => {
    onForgotPassword({ email });
    setEmail("");
  };

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        resetPassword();
      }
    };

    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [email]);

  return (
    <MainContainer>
      <ResetContainer>
        <BackContainer onClick={() => navigate("/login")}>
          <BackBtn />
          <span>Back</span>
        </BackContainer>
        <GreetingContainer>
          <GreetingHeading>Forgot your password?</GreetingHeading>
          <GreetingSubheading>
            Enter your email below for a reset link.
          </GreetingSubheading>
        </GreetingContainer>
        <InputGroup>
          <Label>Email</Label>
          <InputContainer>
            <Input
              placeholder="your@email.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </InputContainer>
        </InputGroup>
        <ResetBtn onClick={resetPassword} isLoading={isLoading}>
          <ResetText>RESET MY PASSWORD</ResetText>
        </ResetBtn>
        <MountainRange/>
      </ResetContainer>
    </MainContainer>
  );
};

export default ForgotPassword;

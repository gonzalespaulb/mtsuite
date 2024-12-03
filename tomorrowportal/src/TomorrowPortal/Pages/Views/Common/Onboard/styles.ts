import styled from "styled-components";
import { flex } from "../../../../utils/helpers";
import { aspen, logo, mountainRange } from "../../assets";
import { colors } from "../../../../utils/colors";
import { zLayer } from "../../../../utils/zIndex";
import { inter, sizing } from "../../../../utils/fonts";
import { spacing } from "../../../../utils/spacing";

const { xsmall, small, medium, large } = spacing;

export const MainContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  ${flex("center", "center")};
  background-image: url(${mountainRange});
  background-size: cover;
`;

export const OnboardContainer = styled.div`
  background: ${colors.secondary};
  border: 1px solid ${colors.border};
  padding: 64px ${large};
  border-radius: 10px;
  z-index: ${zLayer.loginContainer};
  ${flex(undefined, undefined, "column")}

  @media (max-width: 600px) {
    height: 100vh;
    width: 100vw;
    border-radius: 0px;
    padding: 24px;
  }
`;

export const AppBrandContainer = styled.div`
  width: 100%;
  margin-bottom: 48px;
  z-index: 10;
  ${flex(undefined, "center")}
`;

export const AppLogo = styled.div`
  margin-right: 4px;
  height: 25px;
  width: 25px;
  background-image: url(${logo});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const AppName = styled.span`
  font-size: 32px;
  line-height: 32px;
  font-weight: ${inter.bold};
  color: ${colors.primary};
  position: fixed;
  top: 24px;
  left: 24px;
`;

export const WeatherContainer = styled.div`
  ${flex("flex-end")};
`;

export const Weather = styled.span`
  font-size: ${sizing.regular};
  line-height: ${sizing.regular};
  font-weight: ${inter.regular};
  color: ${colors.primary};
  opacity: 0.5;
`;

export const GreetingContainer = styled.div`
  width: 100%;
  ${flex(undefined, undefined, "column")};
  z-index: 10;
`;

export const GreetingSubheading = styled.span`
  font-size: 14px;
  line-height: 14px;
  font-weight: ${inter.regular};
  color: ${colors.primary};
`;

export const GreetingHeading = styled.span`
  font-size: 32px;
  line-height: 32px;
  font-weight: ${inter.bold};
  color: ${colors.primary};
`;

export const InputGroup = styled.div`
  ${flex(undefined, undefined, "column")};
  margin-bottom: ${medium};
  width: 430px;
  z-index: 10;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const Label = styled.label`
  font-size: 16px;
  line-height: 16px;
  font-weight: ${inter.medium};
  margin-bottom: 8px;
  margin-left: 2px;
  color: ${colors.primary};
`;

export const InputContainer = styled.div`
  ${flex()};
  height: 44px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid ${colors.primary};
  overflow: hidden;
`;

interface IconContainerProps {
  icon: string;
}

export const IconContainer = styled.div<IconContainerProps>`
  height: 100%;
  aspect-ratio: 1 / 1;
  background-image: url(${(props) => props.icon});
  background-size: 40%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${colors.input};
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  background: ${colors.input};
  border: none;
  padding: 0 16px;
  font-weight: ${inter.medium};
  color: ${colors.primary};
  border-radius: 0px;
`;

export const EmployeeId = styled(Input)``;

export const Password = styled(Input)``;

export const HandleBtn = styled.div`
  width: 100%;
  height: 44px;
  ${flex("center", "center")};
  background: linear-gradient(
    90deg,
    rgba(46, 94, 145, 1) 0%,
    rgba(27, 74, 120, 1) 100%
  );
  border-radius: 5px;
  cursor: pointer;
`;

export const HandleBtnText = styled.span`
  color: ${colors.secondary};
  font-size: ${sizing.regular};
  line-height: ${sizing.regular};
  font-weight: ${inter.medium};
  letter-spacing: 1px;
`;

export const MountainRange = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 40%;
  background-image: url(${mountainRange});
  background-size: cover;
  background-position: 0 -20%;
  background-repeat: no-repeat;
  z-index: -1;

  @media (min-width: 600px) {
    display: none;
  }
`;

export const NoteBox = styled.div`
  max-width: 430px;
  border-radius: 5px;
  margin: 24px 0;
  background: #e6eff9;
  padding: 16px;
  color: #0860C7;
  font-size: 14px;
  line-height: 18px;
  font-weight: ${inter.regular};
  border: 1px solid #0860C7;
`;

export const Note = styled.p`
  :not(:last-child) {
    margin-bottom: 16px;
  }
`;
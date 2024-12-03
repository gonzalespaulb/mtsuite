import styled from "styled-components";
import { flex } from "../../../../utils/helpers";
import { backArrowPrimary, mountainRange } from "../../assets";
import { colors } from "../../../../utils/colors";
import { spacing } from "../../../../utils/spacing";
import { zLayer } from "../../../../utils/zIndex";
import { inter, sizing } from "../../../../utils/fonts";

const { xsmall, small, medium, large } = spacing;

export const MainContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  ${flex("center", "center")};
  background-image: url(${mountainRange});
  background-size: cover;
`;

export const ResetContainer = styled.div`
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

export const BackContainer = styled.div`
  width: 100%;
  margin-bottom: 48px;
  z-index: 10;
  ${flex(undefined, "center")}

  font-size: 14px;
  line-height: 14px;
  letter-spacing: 1px;
  font-weight: ${inter.semiBold};
  margin-right: 24px;
  overflow: hidden;
  cursor: pointer;
  color: ${colors.primary};

  :hover {
    text-decoration: underline;
  }
`;

export const GreetingContainer = styled.div`
  width: 100%;
  ${flex(undefined, undefined, "column")};
  z-index: 10;
  margin-bottom: 32px;
`;

export const GreetingSubheading = styled.span`
  color: ${colors.primary};
  font-size: 14px;
  line-height: 18px;
  font-weight: ${inter.medium};
`;

export const GreetingHeading = styled.span`
  font-size: 32px;
  line-height: 32px;
  margin-bottom: ${small};
  font-weight: ${inter.bold};
  color: ${colors.primary};
`;

export const BackBtn = styled.div`
  height: 30px;
  width: 30px;
  margin-right: 8px;
  background-image: url(${backArrowPrimary});
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
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

export const Input = styled.input`
  width: 100%;
  height: 100%;
  background: ${colors.input};
  border: none;
  padding: 0 16px;
  font-weight: ${inter.medium};
  color: ${colors.primary};
  border-radius: 0px;
`;

interface ResetBtnProps {
  isLoading: boolean;
}

export const ResetBtn = styled.div<ResetBtnProps>`
  opacity: ${(props) => props.isLoading ? 0.5 : 1};
  pointer-events: ${(props) => props.isLoading ? "none" : "auto"};
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

export const ResetText = styled.span`
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
import styled from "styled-components";
import { flex } from "../../../../../utils/helpers";
import { colors } from "../../../../../utils/colors";
import { inter } from "../../../../../utils/fonts";

export const MainContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(275px, 1fr));
  grid-auto-rows: minmax(min-content, max-content);
  grid-gap: 16px;
  align-items: start;
  width: 100%;
  padding: 16px;
  position: relative;
  min-height: 100%;
  flex: 1;

  @media (min-width: 1450px) {
    padding: 16px 20%;
  }
`;

// NOTE ----------------------------------------------------------------- EMPLOYEE CARD

interface CardProps {
  cardHover: boolean;
}

export const Card = styled.div<CardProps>`
  ${flex("undefined", "center", "column")}
  background: ${colors.secondary};
  height: auto;
  padding: 16px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid ${colors.border};
  box-shadow: ${(props) =>
    props.cardHover ? "rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;" : ""};
  transition: 0.3s ease;
`;

interface ProfilePictureProps {
  employeePicture: string;
}

export const ProfilePicture = styled.div<ProfilePictureProps>`
  background-image: url(${(props) => props.employeePicture});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${colors.primary};
  height: 120px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  margin-bottom: 16px;
`;

export const InformationContainer = styled.div`
  width: 100%;
`;

export const NameContainer = styled.div`
  ${flex("center", "center")}
  width: 100%;
  padding: 0 8px;
  margin-bottom: 16px;
`;

export const Name = styled.span`
  font-size: 24px;
  line-height: 24px;
  color: ${colors.primary};
  font-weight: ${inter};
`;

const Icon = styled.div`
  height: 15px;
  width: 15px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 16px;
`;

interface EmailIconProps {
  icon: string;
}

export const EmailIcon = styled(Icon)<EmailIconProps>`
  background-image: url(${(props) => props.icon});
`;

interface PhoneIconProps {
  icon: string;
}

export const PhoneIcon = styled(Icon)<PhoneIconProps>`
  background-image: url(${(props) => props.icon});
`;

export const EmailContainer = styled.div`
  ${flex(undefined, "center")}
  padding: 16px 0;
  border-top: 1px dashed ${colors.border};
  border-bottom: 1px dashed ${colors.border};
`;

export const IdStatusContainer = styled.div`
  ${flex("space-between", "center")}
  margin-bottom: 32px;
  width: 100%;
`;

export const EmployeeId = styled.span`
  font-size: 16px;
  line-height: 16px;
  color: ${colors.primary};
  font-weight: ${inter.bold};
`;

interface StatusContainerProps {
  isActive: boolean;
}

export const StatusContainer = styled.div<StatusContainerProps>`
  ${flex("center", "center")}
  padding: 8px;
  background: ${(props) => (props.isActive ? "#95d5b2" : "#f4978e")};
  border: 1px solid ${(props) => (props.isActive ? "#1b4332" : "#660708")};
  color: ${(props) => (props.isActive ? "#1b4332" : "#660708")};
  border-radius: 10px;
`;

export const Status = styled.span`
  font-size: 12px;
  line-height: 12px;
  font-weight: ${inter.semiBold};
`;

const EmployeeInfo = styled.span`
  display: block;
  font-weight: ${inter.regular};
  font-size: 12px;
  line-height: 12px;
  color: ${colors.primary};

  :hover {
    text-decoration: underline;
  }
`;

export const Email = styled(EmployeeInfo)``;

export const PhoneContainer = styled.div`
  ${flex(undefined, "center")}
  padding: 16px 0;
  border-bottom: 1px dashed ${colors.border};
`;

export const Phone = styled(EmployeeInfo)``;

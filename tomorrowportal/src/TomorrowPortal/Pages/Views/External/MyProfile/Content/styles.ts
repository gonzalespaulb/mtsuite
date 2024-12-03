import styled from "styled-components";
import { colors } from "../../../../../utils/colors";
import { flex } from "../../../../../utils/helpers";
import { inter } from "../../../../../utils/fonts";

export const MainContainer = styled.div`
  flex: 1;
  width: 100%;
  ${flex()}

  @media (max-width: 800px) {
    ${flex(undefined, undefined, "column")}
  }
`;

export const EmpInfo = styled.div`
  padding: 16px;
  min-height: calc(100vh - 83px);
  position: sticky;
  top: 65px;
  color: ${colors.primary};
  ${flex(undefined, undefined, "column")}
  border-right: 1px solid ${colors.border};

  @media (max-width: 800px) {
    position: static;
    min-height: auto;
    border: none;
  }
`;

export const EmpStats = styled.div`
  color: ${colors.primary};
  ${flex(undefined, undefined, "column")}
  min-height: 100%;
  width: 100%;
  overflow: hidden;
`;

// NOTE ------------------------------------------------ EMP INFO

export const NameIdPictureContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(min-content, max-content) minmax(
      min-content,
      max-content
    );
  grid-template-rows: minmax(min-content, max-content) minmax(
      min-content,
      max-content
    );
  gap: 8px;
  align-items: center;
`;

interface EmployeePictureProps {
  employeePicture: string;
}

export const EmployeePicture = styled.div<EmployeePictureProps>`
  height: 75px;
  width: 75px;
  border-radius: 50%;
  background-image: url(${(props) => props.employeePicture});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  grid-area: 1 / 1 / 3 / 2;
`;

export const FullName = styled.span`
  font-size: 24px;
  line-height: 24px;
  font-weight: ${inter.bold};
  grid-area: 1 / 2 / 2 / 3;
  align-self: end;

  @media (max-width: 800px) {
    line-height: 32px;
  }
`;

export const EmployeeId = styled.span`
  font-size: 16px;
  line-height: 16px;
  font-weight: ${inter.semiBold};
  grid-area: 2 / 2 / 3 / 3;
  align-self: start;
`;

export const InformationLabel = styled.span`
  font-size: 16px;
  line-height: 16px;
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: ${inter.semiBold};
`;

export const ContactContainer = styled.div`
  ${flex(undefined, undefined, "column")}
  width: 100%;
`;

export const ContactInfo = styled.div`
  ${flex(undefined, "center")}
  width: 100%;

  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
  :not(:last-child) {
    margin-bottom: 16px;
  }
`;

interface ContactIconProps {
  iconUrl: string;
}

export const ContactIcon = styled.div<ContactIconProps>`
  height: 15px;
  width: 15px;
  background-image: url(${(props) => props.iconUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-right: 8px;
`;

export const Information = styled.span`
  font-size: 14px;
  line-height: 14px;
  font-weight: ${inter.regular};
`;

export const WeekContainer = styled.div`
  ${flex()}
  border: 1px solid ${colors.primary};
`;

interface DayProps {
  isWorking: boolean;
}

export const Day = styled.div<DayProps>`
  font-size: 12px;
  line-height: 12px;
  height: 40px;
  aspect-ratio: 1 / 1;
  ${flex("center", "center")}
  background: ${(props) => (props.isWorking ? colors.primary : "transparent")};
  color: ${(props) => (props.isWorking ? colors.secondary : colors.primary)};

  :not(:last-child) {
    border-right: 1px solid
      ${(props) => (props.isWorking ? colors.secondary : colors.primary)};
  }
`;

export const TerrainLimit = styled.div`
  padding: 16px;
  font-size: 12px;
  line-height: 12px;
  background: ${colors.primary};
  color: ${colors.secondary};
  border-radius: 5px;
  overflow: hidden;
  letter-spacing: 1px;
`;

interface PositionProps {
  bgColor: string;
}

export const Position = styled.div<PositionProps>`
  padding: 16px;
  font-size: 12px;
  line-height: 12px;
  background: ${(props) => props.bgColor};
  color: #252525;
  font-weight: ${inter.medium};
  border-radius: 5px;
  overflow: hidden;
  letter-spacing: 1px;
`;

interface StatusProps {
  isActive: boolean;
}

export const Status = styled.div<StatusProps>`
  padding: 16px;
  font-size: 12px;
  line-height: 12px;
  background: ${(props) => (props.isActive ? "#95D5B1" : "#F4948E")};
  color: #252525;
  border-radius: 5px;
  overflow: hidden;
  letter-spacing: 1px;
  font-weight: ${inter.medium};
`;


export const Statistics = styled.div`
  flex: 1;
  width: 100%;
  padding: 24px 16px 16px 16px;
`;

export const StatContainer = styled.div`
  width: 100%;
  ${flex(undefined, undefined, "column")}

  :not(:last-child) {
    margin-bottom: 24px;
  }
`;

export const LabelContainer = styled.div`
  margin-bottom: 24px;
  width: 100%;
  ${flex("space-between", "center")}
`;

export const StatLabel = styled.span`
  font-size: 16px;
  line-height: 16px;
  font-weight: ${inter.semiBold};
`;
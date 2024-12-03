import styled from "styled-components";
import { flex } from "../../../../../utils/helpers";
import { aspen } from "../../../assets";
import { colors } from "../../../../../utils/colors";
import { inter } from "../../../../../utils/fonts";

export const MainContainer = styled.div`
  flex: 1;
  width: 100%;
`;

// NOTE ------------------------------------------- INFO SECTION

export const InfoSection = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  padding: 16px;
  ${flex()}
  margin-bottom: 60px;
  background-image: url(${aspen});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const InfoCard = styled.div`
  ${flex(undefined, "center")}
  padding: 16px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  align-self: flex-end;
  margin-bottom: -60px;
  background: ${colors.secondary};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

interface ProfilePictureProps {
  employeePicture: string;
}

export const ProfilePicture = styled.div<ProfilePictureProps>`
  height: 75px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  margin-right: 16px;
  background-image: url(${(props) => props.employeePicture});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const EmployeeInfo = styled.div`
  ${flex(undefined, undefined, "column")}
  flex: 1;
  color: ${colors.primary};
`;

export const Name = styled.span`
  font-size: 18px;
  line-height: 18px;
  margin-bottom: 4px;
  font-weight: ${inter.bold};
`;

export const EmployeeId = styled.span`
  font-size: 14px;
  line-height: 14px;
  margin-bottom: 8px;
  font-weight: ${inter.medium};
`;

interface IPositionColor {
    light: string;
    dark: string;
}

interface PositionProps {
  positionColor: IPositionColor;
}

export const Position = styled.span<PositionProps>`
  font-size: 10px;
  line-height: 10px;
  font-weight: ${inter.bold};
  background: ${(props) => props.positionColor.light};
  border: 1px solid ${(props) => props.positionColor.dark};
  color: ${(props) => props.positionColor.dark};
  padding: 8px;
  border-radius: 10px;
`;

export const SectionLabel = styled.div`
  font-size: 14px;
  font-weight: ${inter.bold};
  line-height: 14px;
  padding: 0 16px;
`;

// NOTE ------------------------------------------- EVENTS SECTION

export const EventsSection = styled.div`
  width: 100%;
  padding: 16px;
  ${flex(undefined, undefined, "column")}
  overflow-x: scroll;
`;

export const EventsContainer = styled.div`
  ${flex()}
  overflow: hidden;
`;
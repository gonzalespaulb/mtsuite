import styled from "styled-components";
import { colors } from "../../../../../utils/colors";
import { flex } from "../../../../../utils/helpers";
import { inter } from "../../../../../utils/fonts";
import { closeSecondary, editSecondary } from "../../../assets";

export const MainContainer = styled.div`
  padding: 16px;
  width: 100%;
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-auto-rows: minmax(min-content, max-content);
  grid-gap: 16px;
  align-items: start;

  @media (min-width: 1450px) {
    padding: 16px 20%;
  }
`;

// NOTE ------------------------------------------------------------------------ DESIGNATION CARD

interface CardProps {
  isActive: boolean;
}

export const Card = styled.div<CardProps>`
  border-radius: 10px;
  border: 1px solid ${colors.primary};
  background: ${colors.secondary};
  ${flex(undefined, undefined, "column")}
  overflow: hidden;
  transition: 0.3s ease;
  opacity: ${(props) => props.isActive ? 1 : 0.5}; 
`;

export const DesignationNameContainer = styled.div`
  height: 70px;
  padding: 0 16px;
  width: 100%;
  background: ${colors.primary};
  ${flex("space-between", "center")}
  color: ${colors.secondary};
  font-size: 16px;
  line-height: 16px;
  font-weight: ${inter.bold};
  letter-spacing: 1px;
  transition: 0.3s ease;
  :hover {
    opacity: 1;
  }
`;

export const EditBtn = styled.div`
  height: 15px;
  width: 15px;
  background-image: url(${editSecondary});
  background-size: cover;
  background-position: center;
  background-repeat:no-repeat;
  cursor: pointer;
`;

interface LocationsContainerProps {
  isActive: boolean;
}

export const LocationsContainer = styled.div<LocationsContainerProps>`
  width: 100%;  
  transition: 0.3s ease;
  z-index: 2;
  // opacity: ${(props) => props.isActive ? 1 : 0.2};
`;

export const LocationName = styled.div`
  width: 100%;
  padding: 16px;
  background: ${colors.secondary};
  font-size: 14px;
  line-height: 14px;
  color: ${colors.primary};
  font-weight: ${inter.bold};
  border-top: 1px solid ${colors.primary};
  ${flex("center", "center")}
`;

interface AssignBtnProps {
  isVisible: boolean;
}

export const AssignBtn = styled.div<AssignBtnProps>`
  width: 100%;
  height: 70px;
  ${flex(undefined, "center")}
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  border-top: 1px solid ${colors.primary};
`;

export const PositionListContainer = styled.div`
  flex: 1;
  height: 100%;
  background: ${colors.input};
  overflow-x: scroll;
  padding: 0 16px;
  ${flex(undefined, "center")}
  background: ${colors.secondary};
`;

export const Position = styled.span`
  font-weight: ${inter.semiBold};
  font-size: 12px;
  line-height: 12px;
  border: 1px solid ${colors.primary};
  padding: 16px;
  background: #EFF0F4;
  border-radius: 10px;

  :not(:last-child) {
    margin-right: 8px;
  }
`;

const addRemove = styled.div`
  height: 100%;
  aspect-ratio: 1 / 1;
`;

interface AddBtnProps {
  isActive: boolean;
}

export const AddBtn = styled(addRemove)<AddBtnProps>`
  background-color: ${colors.lightGreen};
  font-weight: ${inter.bold};
  border-left: 1px solid ${colors.primary};
  color: ${colors.darkGreen};
  ${flex("center", "center")}
  cursor: ${(props) => props.isActive ? "cursor" : "not-allowed"};
`;

export const TimeContainer = styled.div`
  height: 100%;
  width: 24px;
  ${flex("center", "center")}
  background: ${colors.secondary};
  border-right: 1px solid ${colors.primary};
  overflow: hidden;
`;

export const Time = styled.span`
  font-size: 10px;
  line-height: 10px;
  font-weight: ${inter.bold};
  transform: rotateZ(-90deg);
`;

export const BtnCount = styled.div`
  background: ${colors.darkGreen};
  font-weight: ${inter.regular};
  font-size: 14px;
  line-height: 14px;
  height: 32px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  ${flex("center", "center")}
  color: ${colors.lightGreen};
`;

export const AssignEmployeeContainer = styled.div`
  width: 100%;
  height: 70px;
  ${flex(undefined, "center")}
  border-top: 1px solid ${colors.primary};
  position: relative;
  overflow: hidden;
  cursor: pointer;
`;

export const EmployeeInfoContainer = styled.div`
  flex: 1;
  overflow-x: scroll;
  height: 100%;
  ${flex(undefined, "center")}
  padding: 0 16px 0 0;
`;

export const NameContainer = styled.div`
  height: 100%;
  padding: 0 16px;
  border-right: 1px solid ${colors.primary};
  ${flex("center", "center")}
  margin-right: 16px;
  background: ${colors.input};
`;

export const EmployeeName = styled.span`
  font-size: 16px;
  line-height: 16px;
  font-weight: ${inter.bold};
`;

interface RemovePositionProps {
  isRemoving: boolean;
}

export const RemovePosition = styled.div<RemovePositionProps>`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(${(props) => (props.isRemoving ? "0%" : "100%")});
  transition: 0.3s ease;
  cursor: pointer;
  background-color: ${colors.lightRed};
  background-image: url(${closeSecondary});
  background-position: center;
  background-size: 15px;
  background-repeat: no-repeat;
  z-index: 1;
`;

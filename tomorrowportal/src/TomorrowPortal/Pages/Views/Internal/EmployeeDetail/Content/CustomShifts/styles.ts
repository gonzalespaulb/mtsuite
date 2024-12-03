import styled from "styled-components";
import { colors } from "../../../../../../utils/colors";
import { inter } from "../../../../../../utils/fonts";
import { flex } from "../../../../../../utils/helpers";
import { closeSecondary } from "../../../../assets";

export const MainContainer = styled.div`
  width: 100%;
  border: 1px solid ${colors.primary};
  overflow-x: scroll;
  overflow-y: scroll;
  max-height: 350px;
`;

export const LabelBar = styled.div`
  display: grid;
  height: 70px;
  border-bottom: 1px solid ${colors.primary};
  grid-template-columns: 0.5fr 1fr 0.5fr;
  min-width: 600px;

  @media (max-width: 800px) {
    height: 60px;
  }
`;

export const InfoLabel = styled.div`
  font-size: 16px;
  line-height: 16px;
  height: 100%;
  font-weight: ${inter.bold};
  ${flex("center", "center")}

  @media (max-width: 800px) {
    font-size: 14px;
    line-height: 14px;
  }
`;

interface ShiftBarProps {
  upcomingShift: boolean;
}

export const ShiftBar = styled.div<ShiftBarProps>`
  display: grid;
  height: 70px;
  grid-template-columns: 0.5fr 1fr 0.5fr;
  opacity: ${(props) => (props.upcomingShift ? 1 : 0.5)};
  min-width: 600px;
  overflow: hidden;

  @media (max-width: 800px) {
    height: 60px;
  }

  :not(:last-child) {
    border-bottom: 1px solid ${colors.primary};
  }
`;

export const ShiftInfo = styled.div`
  font-size: 16px;
  line-height: 16px;
  height: 100%;
  font-weight: ${inter.regular};
  ${flex("center", "center")}
  position: relative;

  @media (max-width: 800px) {
    font-size: 14px;
    line-height: 14px;
  }

  :not(:last-child) {
    border-right: 1px solid ${colors.primary};
  }
`;

interface DeleteBtnProps {
  isDeleting: boolean;
}

export const DeleteBtn = styled.div<DeleteBtnProps>`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  transform: translateY(${(props) => props.isDeleting ? "0%" : "100%"});
  transition: 0.3s ease;
  cursor: pointer;
  cursor: pointer;
  background-color: ${colors.lightRed};
  background-image: url(${closeSecondary});
  background-position: center;
  background-size: 15px;
  background-repeat: no-repeat;
  z-index: 1;
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

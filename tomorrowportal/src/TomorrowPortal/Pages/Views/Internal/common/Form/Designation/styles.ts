import styled from "styled-components";
import { flex } from "../../../../../../utils/helpers";
import { colors } from "../../../../../../utils/colors";
import { inter } from "../../../../../../utils/fonts";
import { addPrimary, closeSecondary } from "../../../../assets";

export const MainContainer = styled.div`
  ${flex(undefined, undefined, "column")}
  width: 100%;
  grid-column: 1 / -1;
`;

export const Label = styled.label`
  font-size: 16px;
  line-height: 16px;
  margin-bottom: 16px;
  font-weight: ${inter.semiBold};
  color: ${colors.primary};
  display: block;
`;

export const InputGroup = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: minmax(min-content, max-content);
  grid-gap: 16px;
`;

export const DesignationInputContainer = styled.div`
  height: 70px;
  width: 100%;
  grid-column: 1 / 2;
  border-radius: 10px;
  overflow: hidden;
  background: ${colors.input};
  ${flex(undefined, "center")}
`;

export const DesignationInput = styled.input`
  height: 100%;
  border: none;
  background: ${colors.input};
  flex: 1;
  font-weight: ${inter.medium};
  color: ${colors.primary};
  padding: 24px;

  ::placeholder {
    opacity: 0.3;
  }
`;

export const AddBtn = styled.div`
  height: 100%;
  aspect-ratio: 1 / 1;
  background-image: url(${addPrimary});
  background-size: 15px;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${colors.input};
  cursor: pointer;
  border-left: 1px solid ${colors.accent};
  border-radius: 0 10px 10px 0;
`;

export const DesignationsContainer = styled.div`
  width: 100%;
  grid-column: 1 / -1;
  display: grid;
  grid-gap: 16px;
  align-items: start;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: minmax(min-content, max-content);
`;

//  NOTE ------------------------------------------------------------------------- DESIGNATION CARDS

interface CardProps {
  runAnimation: boolean;
}

export const Card = styled.div<CardProps>`
  width: 100%;
  border: 1px solid ${colors.primary};
  border-radius: 10px;
  overflow: hidden;
  opacity: ${(props) => props.runAnimation ? 1 : 0};
  transform: translateY(${(props) => props.runAnimation ? "0%" : "10%"});
  transition: 0.7s cubic-bezier(.51,.92,.24,1.15);
`;

export const DesignationLocation = styled.div`
  width: 100%;
  font-size: 18px;
  line-height: 18px;
  padding: 16px;
  height: 70px;
  color: ${colors.secondary};
  font-weight: ${inter.semiBold};
  ${flex("space-between", "center")}
  background: ${colors.primary};
`;

export const AssignTerrain = styled.span`
  font-size: 12px;
  line-height: 12px;
  opacity: 0.5;
  margin-left: 8px;
`;

export const RemoveBtn = styled.div`
  height: 100%;
  aspect-ratio: 1 / 1;
  background-image: url(${closeSecondary});
  background-size: 15px;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

export const TerrainContainer = styled.div`
  height: 70px;
  width: 100%;
  ${flex(undefined, "center")}
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 16px;
  border-bottom: 1px dashed ${colors.primary};
`;

export const AddContainer = styled.div`
  ${flex(undefined, undefined, "column")}
  width: 100%;
  overflow: hidden;
  position: relative;
`;

interface TimePositionContainerProps {
  isAdding: boolean;
}

export const TimePositionContainer = styled.div<TimePositionContainerProps>`
  width: 100%;
  ${flex(undefined, undefined, "column")}
  height: ${(props) => (props.isAdding ? "188px" : "0px")};
  margin-bottom: ${(props) => (props.isAdding ? "16px" : "0px")};
  overflow: hidden;
  transition: 0.3s ease;
`;

export const TimeContainer = styled.div`
  padding: 16px 16px 0 16px;
  width: 100%;
  ${flex("center", undefined, "column")}
  margin-bottom: 16px;
`;

export const BtnGroup = styled.div`
  ${flex(undefined, "center")}
  width: 100%;
  height: 46px;
  overflow: scroll;
`;

export const PositionContainer = styled.div`
  padding: 0 16px 0 16px;
  width: 100%;
  ${flex("center", undefined, "column")}
`;

interface SelectionBtnProps {
  isSelected: boolean;
}

const SelectionBtn = styled.div<SelectionBtnProps>`
  font-weight: ${inter.bold};
  font-size: 12px;
  line-height: 12px;
  border: 1px solid ${colors.primary};
  border-radius: 10px;
  ${flex("center", "center")}
  padding: 16px;
  color: ${(props) => (props.isSelected ? colors.secondary : colors.primary)};
  white-space: nowrap;
  cursor: pointer;
  flex-shrink: 0;
  position: relative;
  background: ${(props) =>
    props.isSelected ? colors.primary : colors.secondary};
  transition: 0.3s ease;

  :not(:last-child) {
    margin-right: 8px;
  }
`;

export const PositionBtn = styled(SelectionBtn)``;

export const TimeBtn = styled(SelectionBtn)``;

export const TerrainBtn = styled(SelectionBtn)``;

interface BtnSliderProps {
  isAdding: boolean;
}

export const BtnSlider = styled.div<BtnSliderProps>`
  ${flex()}
  height: 70px;
  width: 100%;
  transform: translateX(${(props) => (props.isAdding ? "0%" : "-100%")});
  transition: 0.3s ease;
`;

export const ConfirmCancelContainer = styled.div`
  height: 70px;
  width: 100%;
  flex-shrink: 0;
  ${flex()}
`;

interface ConfirmCancelProps {
  iconUrl: string;
  readyToAdd?: boolean;
}

const ConfirmCancel = styled.div<ConfirmCancelProps>`
  height: 100%;
  cursor: pointer;
  background-image: url(${(props) => props.iconUrl});
  background-size: 15px;
  background-repeat: no-repeat;
  background-position: center;
  transition: 0.3s ease;
`;

export const Confirm = styled(ConfirmCancel)`
  background-color: #95d5b1;
  flex: ${(props) => (props.readyToAdd ? 1 : 0)};
`;

export const Cancel = styled(ConfirmCancel)`
  background-color: #f4968e;
  flex: 1;
`;

interface AddPositionBtnProps {
  isAdding: boolean;
}

export const AddPositionBtn = styled.div<AddPositionBtnProps>`
  height: 100%;
  width: 100%;
  flex-shrink: 0;
  white-space: nowrap;
  ${flex("center", "center")}
  font-weight: ${inter.bold};
  font-size: 16px;
  line-height: 16px;
  cursor: pointer;
  transition: 0.3s ease;
  overflow: hidden;
  background: ${colors.input};
`;

export const Position = styled.span`
  background: ${colors.input};
  padding: 8px 16px;
  border-radius: 10px;

  :not(:last-child) {
    margin-right: 8px;
  }
`;

export const PositionBar = styled.div`
  height: 70px;
  width: 100%;
  ${flex("space-between", "center")}
  padding: 16px;
  border-bottom: 1px dashed ${colors.primary};
  position: relative;
  overflow: hidden;
`;

export const PositionGroup = styled.div`
  ${flex(undefined, "center")}
`;

export const StartTime = styled.span``;

interface RemovePositionBtnProps {
  isRemoving: boolean;
}

export const RemovePositionBtn = styled.div<RemovePositionBtnProps>`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: ${colors.lightRed};
  background-image: url(${closeSecondary});
  background-position: center;
  background-size: 15px;
  background-repeat: no-repeat;
  transform: translateY(${(props) => props.isRemoving ? "0%" : "100%"});
  cursor: pointer;
  transition: 0.3s ease;
`;
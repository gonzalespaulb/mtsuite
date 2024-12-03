import styled from "styled-components";
import { colors } from "../../../../../../utils/colors";
import { inter } from "../../../../../../utils/fonts";
import { flex } from "../../../../../../utils/helpers";
import { closeSecondary } from "../../../../assets";

export const MainContainer = styled.div`
  width: 100%;
  overflow: hidden;
  border: 1px solid ${colors.primary};
  border-radius: 5px;
  // background: blue;

  :not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const LocationName = styled.div`
  width: 100%;
  height: 70px;
  font-size: 18px;
  line-height: 18px;
  padding: 16px;
  background: linear-gradient(
    90deg,
    rgba(46, 94, 145, 1) 0%,
    rgba(27, 74, 120, 1) 100%
  );
  color: ${colors.secondary};
  font-weight: ${inter.semiBold};
  ${flex("center", "center")}
`;

interface TimePositionContainerProps {
  isAdding: boolean;
}

export const TimePositionContainer = styled.div<TimePositionContainerProps>`
  width: 100%;
  ${flex(undefined, undefined, "column")}
  height: 188px;
  margin-bottom: 16px;
  overflow: hidden;
  transition: 0.3s ease;


  width: 100%;
  ${flex(undefined, undefined, "column")}
  height: ${(props) => (props.isAdding ? "188px" : "0px")};
  margin-bottom: ${(props) => (props.isAdding ? "16px" : "0px")};
  overflow: hidden;
  transition: 0.3s ease;
  // background: yellow;
`;

export const TimeContainer = styled.div`
  padding: 16px 16px 0 16px;
  width: 100%;
  ${flex("center", undefined, "column")}
  margin-bottom: 16px;
`;

export const Label = styled.label`
  font-size: 16px;
  line-height: 16px;
  margin-bottom: 16px;
  font-weight: ${inter.semiBold};
  color: ${colors.primary};
  display: block;
`;

export const BtnGroup = styled.div`
  ${flex(undefined, "center")}
  width: 100%;
  height: 46px;
  overflow: scroll;
`;

interface SelectionBtnProps {
  isSelected: boolean;
}

export const SelectionBtn = styled.div<SelectionBtnProps>`
  border-radius: 10px;
  font-size: 12px;
  line-height: 12px;
  font-weight: ${inter.bold};
  padding: 16px;
  ${flex("center", "center")}
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid ${colors.primary};
  background: ${(props) =>
    props.isSelected ? colors.primary : colors.secondary};
  color: ${(props) => (!props.isSelected ? colors.primary : colors.secondary)};
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  flex-wrap: wrap;

  :not(:last-child) {
    margin-right: 8px;
  }
`;

export const PositionContainer = styled.div`
  padding: 0 16px 0 16px;
  width: 100%;
  ${flex("center", undefined, "column")}
`;

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
  padding: 16px;
  border-radius: 10px;
  font-size: 12px;
  line-height: 12px;
  border: 1px solid ${colors.primary};

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
  transform: translateY(${(props) => (props.isRemoving ? "0%" : "100%")});
  cursor: pointer;
  transition: 0.3s ease;
`;

export const PositionGroup = styled.div`
  ${flex(undefined, "center")}
  color: ${colors.primary};
`;

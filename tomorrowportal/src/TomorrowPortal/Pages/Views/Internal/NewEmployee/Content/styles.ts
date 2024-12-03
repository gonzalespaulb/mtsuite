import styled from "styled-components";
import { colors } from "../../../../../utils/colors";
import { flex } from "../../../../../utils/helpers";
import { inter } from "../../../../../utils/fonts";
import { downArrowPrimary } from "../../../assets";

export const MainContainer = styled.div`
  width: 100%;
  flex: 1;
  background: ${colors.secondary};
`;

export const FormContainer = styled.div`
  width: 100%;
  background: ${colors.secondary};
  display: grid;
  align-items: start;
  grid-template-columns: minmax(min-content, max-content) 1fr;
  grid-auto-rows: minmax(min-content, max-content);
  padding: 16px;
  grid-gap: 32px;

  @media (min-width: 1450px) {
    padding: 16px 20%;
  }
`;

interface CheckListProps {
  defaultArea: string;
}

export const CheckList = styled.div<CheckListProps>`
  grid-area: ${(props) => props.defaultArea};
`;

export const CheckListLabel = styled.span`
  font-size: 16px;
  line-height: 16px;
  font-weight: ${inter.semiBold};
  color: ${colors.primary};
  margin-bottom: 24px;
  display: block;
`;

export const List = styled.div`
  ${flex(undefined, undefined, "column")}
`;

export const ListItem = styled.div`
  ${flex(undefined, "center")}

  :not(:last-child) {
    margin-bottom: 16px;
  }
`;

interface BubbleProps {
  isFilled: boolean;
}

export const Bubble = styled.div<BubbleProps>`
  height: 15px;
  width: 15px;
  margin-right: 8px;
  border-radius: 50%;
  border: 1px solid ${colors.primary};
  background: ${(props) => (props.isFilled ? colors.primary : "transparent")};
  transition: 0.3s ease;
`;

export const Item = styled.span`
  font-size: 14px;
  line-height: 14px;
  opacity: 0.5;
  font-weight: ${inter.medium};
`;

interface FormProps {
  defaultArea: string;
}

export const Form = styled.div<FormProps>`
  grid-area: ${(props) => props.defaultArea};
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: minmax(min-content, max-content);
  grid-gap: 24px;
`;

export const InputContainer = styled.div`
  ${flex(undefined, undefined, "column")}
  position: relative;
`;

export const Input = styled.input`
  border: 1px solid ${colors.primary};
  background: ${colors.input};
  height: 44px;
  width: 100%;
  border-radius: 10px;
  font-weight: ${inter.medium};
  color: ${colors.primary};
  padding: 0 16px;
`;

export const Label = styled.label`
  font-size: 16px;
  line-height: 16px;
  margin-bottom: 16px;
  font-weight: ${inter.semiBold};
  color: ${colors.primary};
  display: block;
`;

interface SelectionProps {
  isSelected: boolean;
}

export const Selection = styled.div<SelectionProps>`
  padding: 16px;
  border-radius: 10px;
  ${flex("center", "center")}
  cursor: pointer;
  margin-bottom: 8px;
  margin-right: 8px;
  background: ${(props) => (props.isSelected ? "#E6EFF9" : colors.input)};
  color: ${(props) => (props.isSelected ? "#0761C7" : colors.primary)};
  transition: 0.3s ease;
`;

export const SelectionText = styled.span`
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 1px;
  font-weight: ${inter.semiBold};
  white-space: nowrap;
`;

export const TerrainAvailabilityContainer = styled.div`
  grid-area: 3 / 2 / 4 / 3;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(min-content, max-content);
  grid-row-gap: 24px;
`;

export const BtnGroup = styled.div`
  ${flex()}
  flex-wrap: wrap;
  margin-bottom: -8px;
`;

export const Terrain = styled.div``;

export const Availability = styled.div``;

export const EmployeeImageArea = styled.div`
  grid-area: 4 / 2 / 5 / 3;
`;

export const ImageDrop = styled.div`
  height: 250px;
  width: 100%;
  border: 2px dashed ${colors.input};
  background: ${colors.input};
  border-radius: 10px;
  ${flex("center", "center", "column")}
`;

export const DragTextContainer = styled.div`
  width: 170px;
  text-align: center;
  margin-bottom: 8px;
`;

export const DragText = styled.span`
  font-size: 16px;
  line-height: 16px;
  font-weight: ${inter.semiBold};
`;

export const BrowseBtn = styled.div`
  background: ${colors.primary};
  ${flex("center", "center")}
  border-radius: 10px;
  padding: 16px;
  cursor: pointer;
`;

export const BrowseBtnText = styled.span`
  font-size: 12px;
  line-height: 12px;
  color: ${colors.secondary};
  font-weight: ${inter.semiBold};
`;

// NOTE ------------------------------------------------ DROP DOWN INPUT

interface DropDownContainerProps {
  openPositions: boolean;
}

export const DropDownContainer = styled.div<DropDownContainerProps>`
  height: 44px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${colors.primary};
  background: ${colors.input};
  overflow: ${(props) => (props.openPositions ? "visible" : "hidden")};
  ${flex()}
  position: relative;
`;

export const DropDownBtn = styled.div`
  height: 100%;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  border-radius: 10px 0 0 10px;
  background-image: url(${downArrowPrimary});
  background-size: 20%;
  background-repeat: no-repeat;
  background-position: center;
  border-right: 1px solid ${colors.primary};
`;

export const SelectedPositionContainer = styled.div`
  flex: 1;
  height: 100%;
  padding: 24px;
  ${flex(undefined, "center")}
`;

export const SelectedPosition = styled.span`
  font-weight: ${inter.medium};
  color: ${colors.primary};
`;

export const PositionsContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  transform: translateY(calc(100% + 8px));
  z-index: 10;
  border: 1px solid ${colors.border};
  border-radius: 10px;
  overflow: hidden;
`;

export const Position = styled.div`
  height: 70px;
  width: 100%;
  padding: 24px;
  background: ${colors.secondary};
  cursor: pointer;
  ${flex("space-between", "center")}

  :hover {
    background: #EFF0F4;
  }

  :not(:last-child) {
    border-bottom: 1px solid ${colors.border};
  }
`;

export const PositionText = styled.span` 
  font-weight: ${inter.medium};
  color: ${colors.primary};
  font-size: 16px;
  line-height: 16px;
`;

interface PositionIndicatorProps {
  positionName: string;
  selectedPosition: string;
}

export const PositionIndicator = styled.div<PositionIndicatorProps>`
  height: 15px;
  width: 15px;
  background: ${colors.primary};
  border-radius: 50%;
  display: ${(props) =>
    props.positionName === props.selectedPosition ? "block" : "none"};
`;

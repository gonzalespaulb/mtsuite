import styled from "styled-components";
import { flex } from "../../../../../../utils/helpers";
import { colors } from "../../../../../../utils/colors";
import { inter } from "../../../../../../utils/fonts";
import { downArrowPrimary } from "../../../../assets";

export const MainContainer = styled.div`
  ${flex(undefined, undefined, "column")}
  width: 100%;
`;

export const Label = styled.label`
  font-size: 16px;
  line-height: 16px;
  margin-bottom: 16px;
  font-weight: ${inter.semiBold};
  color: ${colors.primary};
  display: block;
`;

interface DropDownContainerProps {
  openDropdown: boolean;
}

export const DropDownContainer = styled.div<DropDownContainerProps>`
  height: 70px;
  width: 100%;
  border-radius: 10px;
  background: ${colors.input};
  overflow: ${(props) => (props.openDropdown ? "visible" : "hidden")};
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
  border-right: 1px solid ${colors.border};
`;

export const SelectedItemContainer = styled.div`
  flex: 1;
  height: 100%;
  padding: 24px;
  ${flex(undefined, "center")}
`;

export const SelectedItem = styled.span`
  font-weight: ${inter.medium};
  color: ${colors.primary};
`;

export const ItemSelectionContainer = styled.div`
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

export const Item = styled.div`
  height: 70px;
  width: 100%;
  padding: 24px;
  background: ${colors.accent};
  cursor: pointer;
  ${flex("space-between", "center")}

  :hover {
    background: #eae8e3;
  }

  :not(:last-child) {
    border-bottom: 1px solid ${colors.border};
  }
`;

export const ItemText = styled.span`
  font-weight: ${inter.medium};
  color: ${colors.primary};
  font-size: 16px;
  line-height: 16px;
`;

interface ItemIndicatorProps {
  itemName: string;
  selectedItem: string;
}

export const ItemIndicator = styled.div<ItemIndicatorProps>`
  height: 15px;
  width: 15px;
  background: ${colors.primary};
  border-radius: 50%;
  display: ${(props) =>
    props.itemName === props.selectedItem ? "block" : "none"};
`;

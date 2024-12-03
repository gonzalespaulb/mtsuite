import styled from "styled-components";
import { filterPrimary } from "../../../../assets";
import { colors } from "../../../../../../utils/colors";
import { flex } from "../../../../../../utils/helpers";
import { inter } from "../../../../../../utils/fonts";

export const MainContainer = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 5px;
  border: 1px solid ${colors.border};
  cursor: pointer;
  background-color: ${colors.secondary};
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${filterPrimary});
  background-size: 45%;
  margin-right: 8px;
  position: relative;

  transition: 0.3s ease;

  :hover {
    background-color: ${colors.border};
  }
`;

interface PopOutProps {
  openPopOut: boolean;
}

export const PopOut = styled.div<PopOutProps>`
  border: 1px solid ${colors.border};
  border-radius: 10px;
  transform: translate(calc(100% - 32px), calc(100% + 8px));
  background: ${colors.secondary};
  bottom: 0;
  right: 0;
  display: ${(props) => (props.openPopOut ? "block" : "none")};
  position: absolute;
  padding: 16px;
`;

interface SortContainerProps {
  sortType: string;
  type: string;
}

export const SortContainer = styled.div<SortContainerProps>`
  ${flex("center", "center")}
  height: 44px;
  width: 100%;
  border-radius: 5px;
  width: 200px;
  white-space: nowrap;
  font-size: 12px;
  line-height: 12px;
  font-weight: ${inter.semiBold};
  color: ${colors.primary};
  border: ${(props) =>
    props.sortType === props.type ? `1px solid ${colors.primary}` : "none"};
  background: #e6eff9;

  :not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const SortBy = styled.div`
  font-size: 14px;
  line-height: 14px;
  font-weight: ${inter.medium};
  white-space: nowrap;
  ${flex(undefined, "center")}

  :not(:last-child) {
    margin-bottom: 8px;
  }
`;

interface CheckBoxProps {
  sortOption: string;
  option: string;
}

export const CheckBox = styled.div<CheckBoxProps>`
  height: 20px;
  width: 20px;
  border-radius: 3px;
  margin-right: 8px;
  border: 1px solid ${colors.primary};
  cursor: pointer;
  background: ${(props) =>
    props.sortOption === props.option ? colors.primary : "transparent"};
`;

export const SortOptionContainer = styled.div`
  ${flex(undefined, undefined, "column")}
  width: 100%;
  margin-bottom: 16px;
`;
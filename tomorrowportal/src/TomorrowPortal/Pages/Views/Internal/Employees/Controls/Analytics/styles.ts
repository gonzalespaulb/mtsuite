import styled from "styled-components";
import { analyticsPrimary } from "../../../../assets";
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
  background-image: url(${analyticsPrimary});
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
  display: ${(props) => props.openPopOut ? "block" : "none"};
  position: absolute;
  padding: 16px;
  width: 350px;
`;

export const CountContainer = styled.div`
  ${flex("space-between", "center")}
  width: 100%;
  padding: 0 16px;
  white-space: nowrap;
  font-size: 16px;
  line-height: 16px;
  font-weight: ${inter.semiBold};
  color: ${colors.primary};

  :not(:last-child) {
    margin-bottom: 8px;
  }
`;

interface CountProps {
  filterType: null | boolean;
  countType: null | boolean;
}

export const Count = styled.div<CountProps>`
  background: #E6EFF9;
  border-radius: 5px;
  padding: 16px;
  font-size: 12px;
  line-height: 12px;
  border: ${(props) => props.countType === props.filterType ? `1px solid ${colors.primary}` : "none"};
`;
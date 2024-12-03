import styled from "styled-components";
import { flex } from "../../../../../../utils/helpers";
import { colors } from "../../../../../../utils/colors";
import { downChevronSecondary, searchPrimary } from "../../../../assets";
import { inter } from "../../../../../../utils/fonts";

interface MainContainerProps {
  openSearch: boolean;
}

export const MainContainer = styled.div<MainContainerProps>`
  width: ${(props) => (props.openSearch ? "400px" : "32px")};
  height: 32px;
  border-radius: 5px;
  ${flex()}
  overflow: hidden;
  background: ${colors.input};
  transition: 0.3s ease;
`;

interface IconContainerProps {
    openSearch: boolean;
}

export const IconContainer = styled.div<IconContainerProps>`
  height: 32px;
  width: 32px;
  border-radius: 5px;
  border-radius: ${(props) => props.openSearch ? "5px 0 0 5px" : "5px"};
  border: 1px solid ${colors.border};
  cursor: pointer;
  background-color: ${colors.secondary};
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${searchPrimary});
  background-size: 45%;
  position: relative;
  flex-shrink: 0;
`;

interface InputProps {
    openSearch: boolean;
}

export const Input = styled.input<InputProps>`
    border: none;
    flex: 1;
    height: 100%;
    font-size: 14px;
    line-height: 14px;
    padding: 0 8px;
    font-weight: ${inter.semiBold};
    color: ${colors.primary};
    background: ${colors.input};
    opacity: ${(props) => props.openSearch ? 1 : 0};
    transition: 0.3s ease;
`;

interface CategoryProps {
    openSearch: boolean;
}

export const Category = styled.div<CategoryProps>`
    padding: 0 16px;
    ${flex("center", "center")}
    height: 100%;
    font-size: 12px;
    line-height: 12px;
    font-weight: ${inter.medium};
    white-space: nowrap;
    background: ${colors.primary};
    color: ${colors.secondary};
    letter-spacing: 1px;
    transform: translateY(${(props) => props.openSearch ? 0: "100%"});
    transition: transform 0.4s 0.3s ease;
    cursor: pointer;
`;

export const DownChevron = styled.div`
  height: 15px;
  width: 15px;
  margin-left: 8px;
  background-image: url(${downChevronSecondary});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
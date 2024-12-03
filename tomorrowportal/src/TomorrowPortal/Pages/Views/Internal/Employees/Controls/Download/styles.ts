import styled from "styled-components";
import { downloadPrimary } from "../../../../assets";
import { colors } from "../../../../../../utils/colors";
import { inter } from "../../../../../../utils/fonts";
import { flex } from "../../../../../../utils/helpers";
import { color } from "d3";

export const MainContainer = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 5px;
  border: 1px solid ${colors.border};
  cursor: pointer;
  background-color: ${colors.secondary};
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${downloadPrimary});
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
  width: 350px;
  border: 1px solid ${colors.border};
  border-radius: 10px;
  transform: translate(calc(100% - 32px), calc(100% + 8px));
  background: ${colors.secondary};
  bottom: 0;
  right: 0;
  display: ${(props) => (props.openPopOut ? "grid" : "none")};
  position: absolute;
  padding: 16px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, 1fr) minmax(min-content, max-content);
  grid-gap: 8px;
`;

export const ToDownload = styled.div`
  font-size: 14px;
  line-height: 14px;
  font-weight: ${inter.medium};
  ${flex(undefined, "center")}
`;

interface CheckBoxProps {
  isChecked: boolean;
}

export const CheckBox = styled.div<CheckBoxProps>`
  height: 20px;
  width: 20px;
  border-radius: 3px;
  margin-right: 8px;
  border: 1px solid ${colors.primary};
  cursor: pointer;
  background: ${(props) =>
    props.isChecked ? colors.primary : "transparent"};
`;

export const DownloadBtn = styled.div`
    height: 44px;
    background: #E6EFF9;
    color: ${colors.primary};
    font-size: 12px;
  line-height: 12px;
  font-weight: ${inter.semiBold};
  grid-column: 1 / 3;
  ${flex("center", "center")}
  border: 1px solid ${colors.primary};
  border-radius: 5px;
`;

export const Input = styled.input`
height: 44px;
background: ${colors.input};
color: ${colors.primary};
font-size: 12px;
line-height: 12px;
font-weight: ${inter.semiBold};
grid-column: 1 / 3;
text-align: center;
border: 1px solid ${colors.primary};
border-radius: 5px;
`;
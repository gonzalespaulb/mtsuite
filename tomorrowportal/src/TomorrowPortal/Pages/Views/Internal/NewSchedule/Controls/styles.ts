import styled from "styled-components";
import { flex } from "../../../../../utils/helpers";
import { colors } from "../../../../../utils/colors";
import { zLayer } from "../../../../../utils/zIndex";
import { inter } from "../../../../../utils/fonts";
import {
  calendarPrimary,
  checkSecondary,
  editPrimary,
  sendSecondary,
} from "../../../assets";

export const MainContainer = styled.div`
  position: sticky;
  top: 83px;
  ${flex("space-between", "center")}
  background: ${colors.secondary};
  z-index: ${zLayer.controlsBar};
  border-bottom: 1px solid ${colors.border};
  padding: 16px;
  width: 100%;

  @media (min-width: 1450px) {
    padding: 16px 20%;
  }
`;

export const ControlBtn = styled.div`
  background: ${colors.primary};
  color: ${colors.secondary};
  padding: 16px;
  border-radius: 10px;
  font-size: 12px;
  line-height: 12px;
  font-weight: ${inter.bold};
  letter-spacing: 1px;
  ${flex(undefined, "center")}
  cursor: pointer;
`;

export const ControlIcon = styled.div`
  height: 10px;
  width: 10px;
  background-image: url(${sendSecondary});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-left: 8px;
`;

export const InputControls = styled.div`
  ${flex(undefined, "center")}
`;

export const InputGroup = styled.div`
  ${flex(undefined, "center")}
  height: 44px;

  :first-child {
    margin-right: 8px;
  }
`;

export const StaticInfo = styled.div`
  height: 100%;
  font-size: 14px;
  line-height: 14px;
  padding: 0 16px;
  color: ${colors.primary};
  letter-spacing: 1px;
  font-weight: ${inter.bold};
  ${flex(undefined, "center")}
  border-radius: 10px 0 0 10px;
  border-right: 1px solid ${colors.secondary};
  background: ${colors.input};
`;

export const TypeInput = styled.input`
  height: 100%;
  font-size: 14px;
  line-height: 14px;
  padding: 0 16px;
  color: ${colors.primary};
  letter-spacing: 1px;
  font-weight: ${inter.bold};
  width: 150px;
  border: none;
  border-radius: 10px 0 0 10px;
  background: ${colors.input};
`;

interface EditBtnProps {
  editTitle: boolean;
}

export const EditBtn = styled.div<EditBtnProps>`
  height: 100%;
  aspect-ratio: 1/ 1;
  background: ${(props) => (props.editTitle ? colors.primary : colors.input)};
  border-radius: 0 10px 10px 0;
  background-image: url(${(props) =>
    props.editTitle ? checkSecondary : editPrimary});
  background-size: 10px;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;

export const CalendarBtn = styled.div`
height: 100%;
aspect-ratio: 1/ 1;
background: ${colors.input};
border-radius: 0 10px 10px 0;
background-image: url(${calendarPrimary});
background-size: 15px;
background-repeat: no-repeat;
background-position: center;
`;

interface DraftBtnProps {
  isDraft: boolean;
}

export const DraftBtn = styled.div<DraftBtnProps>`
  font-size: 12px;
  line-height: 12px;
  font-weight: ${inter.bold};
  letter-spacing: 1px;
  border: 1px solid black;
  padding: 16px;
  border-radius: 10px;
  color: ${(props) => props.isDraft ? colors.secondary : colors.primary};
  background: ${(props) => props.isDraft ? colors.primary : colors.secondary};
  cursor: pointer;
  margin-left: auto;
  margin-right: 8px;
  transition: 0.3s ease;
`;
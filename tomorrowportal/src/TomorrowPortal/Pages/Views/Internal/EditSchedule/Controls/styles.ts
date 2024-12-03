import styled from "styled-components";
import { flex } from "../../../../../utils/helpers";
import { colors } from "../../../../../utils/colors";
import { zLayer } from "../../../../../utils/zIndex";
import { inter } from "../../../../../utils/fonts";
import { backArrowPrimary, sendSecondary } from "../../../assets";

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

export const BackTitleContainer = styled.div`
  ${flex(undefined, "center")}
  height: 44px;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 1px;
  font-weight: ${inter.semiBold};
  margin-right: 24px;
  overflow: hidden;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

export const BackBtn = styled.div`
  height: 30px;
  width: 30px;
  margin-right: 8px;
  background-image: url(${backArrowPrimary});
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;

export const ScheduleBtn = styled.div`
  font-size: 12px;
  line-height: 12px;
  font-weight: ${inter.bold};
  letter-spacing: 1px;
  background: #e6eff9;
  color: #0761c7;
  padding: 16px;
  border-radius: 10px;
  cursor: pointer;
  margin-right: auto;
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
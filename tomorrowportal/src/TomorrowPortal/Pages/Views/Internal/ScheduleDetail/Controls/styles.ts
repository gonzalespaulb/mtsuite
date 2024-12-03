import styled from "styled-components";
import { flex } from "../../../../../utils/helpers";
import { colors } from "../../../../../utils/colors";
import { backArrowPrimary, downloadPrimary } from "../../../assets";
import { inter } from "../../../../../utils/fonts";

export const MainContainer = styled.div`
  position: sticky;
  top: 82px;
  padding: 16px;
  width: 100%;
  background: ${colors.secondary};
  border-bottom: 1px solid ${colors.border};
  ${flex(undefined, "center")}
  width: 100%;
  z-index: 5;
  overflow-x: auto;
  overflow-y: hidden;

  @media (max-width: 600px) {
    top: 65px;
    height: 65px;
  }

  @media (min-width: 1450px) {
    padding: 16px 20%;
  }
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

interface ScheduleBtnProps {
  inView: boolean;
}

export const ScheduleBtn = styled.div<ScheduleBtnProps>`
  font-size: 12px;
  line-height: 12px;
  font-weight: ${inter.bold};
  letter-spacing: 1px;
  background: ${(props) => (props.inView ? "#E6EFF9" : "#EFF0F4")};
  color: ${(props) => (props.inView ? "#0761C7" : colors.primary)}; 
  padding: 16px;
  border-radius: 10px;
  cursor: pointer;
  white-space: nowrap;

  :not(:last-child) {
    margin-right: 8px;
  }
`;

export const DownloadBtn = styled.div`
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
margin-left: auto;

transition: 0.3s ease;

:hover {
  background-color: ${colors.border};
}
`;
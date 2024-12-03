import styled from "styled-components";
import { flex } from "../../../../../utils/helpers";
import { colors } from "../../../../../utils/colors";
import { spacing } from "../../../../../utils/spacing";
import { inter, sizing } from "../../../../../utils/fonts";
import { zLayer } from "../../../../../utils/zIndex";
import { plus } from "../../../assets";

export const MainContainer = styled.div`
  position: sticky;
  top: 83px;
  padding: 16px;
  ${flex("space-between", "center")}
  background: ${colors.secondary};
  border-bottom: 1px solid ${colors.border};
  z-index: ${zLayer.controlsBar};
  width: 100%;

  @media (max-width: 600px) {
    top: 65px;
    padding: 0 16px;
    height: 65px;
  }

  @media (min-width: 1450px) {
    width: 100%;
    padding: 16px 20%;
  }
`;
// NOTE ----------------------------------------------------------------------------- FILTER BTNS

export const FilterBtnsContainer = styled.div`
  ${flex(undefined, "center")}
  height: 44px;
`;

// NOTE ----------------------------------------------------------------------------- ADD EMPLOYEE BTN


export const NewEmployeeBtn = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 5px;
  border: 1px solid ${colors.border};
  cursor: pointer;
  background-color: ${colors.secondary};
  background-image: url(${plus});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 50%;

  transition: 0.3s ease;

  :hover {
    background-color: ${colors.border};
  }
`;
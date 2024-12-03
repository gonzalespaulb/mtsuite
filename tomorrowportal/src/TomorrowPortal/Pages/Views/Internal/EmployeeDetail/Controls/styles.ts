import styled from "styled-components";
import { colors } from "../../../../../utils/colors";
import { flex } from "../../../../../utils/helpers";
import { spacing } from "../../../../../utils/spacing";
import { inter, sizing } from "../../../../../utils/fonts";
import backArrow from "./assets/backArrow.png";
import edit from "./assets/edit.png";

export const MainContainer = styled.div`
  position: sticky;
  top: 82px;
  padding: 16px;
  background: ${colors.secondary};
  border-bottom: 1px solid ${colors.border};
  ${flex("space-between", "center")}
  width: 100%;

  @media (min-width: 1450px) {
    padding: 16px 20%;
  }
`;


export const BackBtnContainer = styled.div`

`;

export const BackBtn = styled.div`
  height: 40px;
  width: 40px;
  background-image: url(${backArrow});
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;

const Btn = styled.div`
  ${flex("center", "center")}
  padding: ${spacing.small};
  border-radius: 10px;
  cursor: pointer;
`;

const BtnText = styled.span`
  font-size: ${sizing.tiny};
  line-height: ${sizing.tiny};
  font-weight: ${inter.bold};
  letter-spacing: 1px;
  white-space: nowrap;
`;

export const EditIcon = styled.div`
  height: 10px;
  width: 10px;
  background-image: url(${edit});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Edit = styled(Btn)`
    background: ${colors.primary};
`;

export const EditText = styled(BtnText)`
    color: ${colors.secondary};
    margin-right: 8px;
`;
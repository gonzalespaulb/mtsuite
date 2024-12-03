import styled from "styled-components";
import { colors } from "../../../../../../utils/colors";
import { inter } from "../../../../../../utils/fonts";
import { flex } from "../../../../../../utils/helpers";

export const MainContainer = styled.div`
  width: 100%;
  border: 1px solid ${colors.primary};
  overflow-x: scroll;
  overflow-y: scroll;
  max-height: 350px;
`;

export const LabelBar = styled.div`
  display: grid;
  min-width: 600px;
  height: 70px;
  border-bottom: 1px solid ${colors.primary};
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media (max-width: 800px) {
    height: 60px;
  }
`;

export const InfoLabel = styled.div`
  font-size: 16px;
  line-height: 16px;
  height: 100%;
  font-weight: ${inter.bold};
  ${flex("center", "center")}

  @media (max-width: 800px) {
    font-size: 14px;
    line-height: 14px;
  }
`;

export const AssignmentBar = styled.div`
  display: grid;
  height: 70px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  min-width: 600px;

  @media (max-width: 800px) {
    height: 60px;
  }

  :not(:last-child) {
    border-bottom: 1px solid ${colors.primary};
  }
`;

export const AssignmentInfo = styled.div`
  font-size: 16px;
  line-height: 16px;
  height: 100%;
  font-weight: ${inter.regular};
  ${flex("center", "center")}

  @media (max-width: 800px) {
    font-size: 14px;
    line-height: 14px;
  }

  :not(:last-child) {
    border-right: 1px solid ${colors.primary};
  }
`;

import styled from "styled-components";
import { flex } from "../../../../../../utils/helpers";
import { colors } from "../../../../../../utils/colors";
import { inter } from "../../../../../../utils/fonts";

export const MainContainer = styled.div`
  ${flex(undefined, undefined, "column")}
  width: 100%;
`;

export const Label = styled.label`
  font-size: 16px;
  line-height: 16px;
  margin-bottom: 16px;
  font-weight: ${inter.semiBold};
  color: ${colors.primary};
  display: block;
`;

export const Input = styled.input`
  border: none;
  background: ${colors.input};
  height: 70px;
  width: 100%;
  border-radius: 10px;
  font-weight: ${inter.medium};
  color: ${colors.primary};
  padding: 24px;

  ::placeholder {
    opacity: 0.3;
  }
`;

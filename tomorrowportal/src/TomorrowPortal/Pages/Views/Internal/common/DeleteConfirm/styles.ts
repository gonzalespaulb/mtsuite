import styled from "styled-components";
import { flex } from "../../../../../utils/helpers";
import { inter, sizing } from "../../../../../utils/fonts";
import { colors } from "../../../../../utils/colors";

export const MainContainer = styled.div`
  width: 100vw;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #ffd9dc;
  border-top: 1px solid #fe9e9f;
  padding: 32px 16px;
  ${flex(undefined, "center")}
`;

export const WarningContainer = styled.div`
  flex: 1;
  font-size: 24px;
  line-height: 24px;
  font-weight: ${inter.bold};
  color: #fe9e9f;
  ${flex(undefined, "center")}
`;

export const WarningMessage = styled.span`
  font-size: 16px;
  line-height: 16px;
  font-weight: ${inter.medium};
  color: #fe9e9f;
  margin-left: 8px;
`;

export const Input = styled.input`
  height: 44px;
  width: 200px;
  border: 1px solid #fe9e9f;
  border-radius: 5px;
  background: ${colors.input};
  text-align: center;
  font-size: ${sizing.regular};
  line-height: ${sizing.regular};
  font-weight: ${inter.semiBold};
  margin-right: 8px;
`;

export const Cancel = styled.div`
  font-size: ${sizing.regular};
  line-height: ${sizing.regular};
  font-weight: ${inter.medium};
  letter-spacing: 1px;
  padding: 0 16px;
  height: 44px;
  border-radius: 5px;
  ${flex("center", "center")}
  cursor: pointer;
  color:  #fe9e9f;
  border: 1px solid  #fe9e9f;
  margin-right: 8px;
`;

export const ConfirmBtn = styled.div`
  color: ${colors.secondary};
  font-size: ${sizing.regular};
  line-height: ${sizing.regular};
  font-weight: ${inter.medium};
  letter-spacing: 1px;
  padding: 0 16px;
  height: 44px;
  border-radius: 5px;
  ${flex("center", "center")}
  background: #fe9e9f;
  cursor: pointer;
`;

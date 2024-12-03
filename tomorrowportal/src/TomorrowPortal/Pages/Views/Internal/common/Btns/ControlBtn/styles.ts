import styled from "styled-components";
import { colors } from "../../../../../../utils/colors";
import { inter, sizing } from "../../../../../../utils/fonts";
import { flex } from "../../../../../../utils/helpers";

interface IMarginConfig {
  marginLeft: number | undefined;
  marginRight: number | undefined;
  marginBottom: number | undefined;
  marginTop: number | undefined;
}

interface ControlProps {
  marginConfig: IMarginConfig;
}

const Control = styled.div<ControlProps>`
  border-radius: 10px;
  font-size: 12px;
  line-height: 12px;
  font-weight: ${inter.bold};
  padding: 16px;
  ${flex("center", "center")}
  letter-spacing: 1px;
  white-space: nowrap;
  overflow: hidden;
  cursor: pointer;
`;

export const SOLID = styled(Control)<ControlProps>`
  background: ${colors.primary};
  color: ${colors.secondary};
  margin-left: ${(props) =>
    props.marginConfig.marginLeft ? props.marginConfig.marginLeft : 0}px;
  margin-right: ${(props) =>
    props.marginConfig.marginRight ? props.marginConfig.marginRight : 0}px;
  margin-bottom: ${(props) =>
    props.marginConfig.marginBottom ? props.marginConfig.marginBottom : 0}px;
  margin-top: ${(props) =>
    props.marginConfig.marginTop ? props.marginConfig.marginTop : 0}px;
`;

export const BORDERED = styled(Control)<ControlProps>`
  background: ${colors.accent};
  border: 1px solid ${colors.primary};
  color: ${colors.primary};
  margin-left: ${(props) =>
    props.marginConfig.marginLeft ? props.marginConfig.marginLeft : 0}px;
  margin-right: ${(props) =>
    props.marginConfig.marginRight ? props.marginConfig.marginRight : 0}px;
  margin-bottom: ${(props) =>
    props.marginConfig.marginBottom ? props.marginConfig.marginBottom : 0}px;
  margin-top: ${(props) =>
    props.marginConfig.marginTop ? props.marginConfig.marginTop : 0}px;
`;

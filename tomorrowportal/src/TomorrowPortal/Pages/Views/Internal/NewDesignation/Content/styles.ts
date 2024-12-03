import styled from "styled-components";
import { colors } from "../../../../../utils/colors";
import { flex } from "../../../../../utils/helpers";
import { inter } from "../../../../../utils/fonts";

export const MainContainer = styled.div`
  padding: 16px;
  flex: 1;
  width: 100%;
  ${flex(undefined, undefined, "column")}
`;

interface FormContainerProps {
  modifyRadius: boolean;
}

export const FormContainer = styled.div<FormContainerProps>`
  flex: ${(props) => !props.modifyRadius ? 0 : 1};
  width: 100%;
  background: ${colors.secondary};
  border-radius: 10px 10px  ${(props) => !props.modifyRadius ? "0 0" : "10px 10px"};
  border: 1px solid ${colors.border};
  padding: 24px;
  ${flex(undefined, undefined, "column")}
`;

export const Section = styled.div`
  width: 100%;
  display: grid;
  align-items: start;
  grid-template-columns: minmax(min-content, max-content) 1fr;
  grid-auto-rows: minmax(min-content, max-content);
  grid-gap: 32px;

  :not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const Inputs = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: minmax(min-content, max-content);
`;

interface EmptyStateProps {
  modifyRadius: boolean;
}

export const EmptyState = styled.div<EmptyStateProps>`
  flex: 1;
  width: 100%;
  background: ${colors.secondary};
  border: 1px solid ${colors.border};
  border-top: none;
  border-radius: ${(props) => !props.modifyRadius ? "0 0 10px 10px" : "0 0 0 0"};
  ${flex("center", "center")}
  font-size: 16px;
  line-height: 16px;
  color: ${colors.primary};
  font-weight: ${inter.semiBold};
`;
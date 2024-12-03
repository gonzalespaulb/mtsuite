import styled from "styled-components";
import { flex } from "../../../../utils/helpers";
import { colors } from "../../../../utils/colors";

export const MainContainer = styled.div`
  ${flex(undefined, undefined, "column")};
  width: 100%;
  min-height: 100%;
  position: relative;
  background: ${colors.secondary};
`;
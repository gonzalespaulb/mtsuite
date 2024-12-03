import styled from "styled-components";
import { flex } from "../../../../utils/helpers";

export const MainContainer = styled.div`
  ${flex(undefined, undefined, "column")};
  width: 100%;
  min-height: 100%;
  position: relative;
  background: #EFF0F4;
  
  @media (min-width: 1450px) {
   ${flex(undefined, "center", "column")};
  }
`;


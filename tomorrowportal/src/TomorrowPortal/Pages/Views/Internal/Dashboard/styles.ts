import styled from "styled-components";
import { flex } from "../../../../utils/helpers";

export const MainContainer = styled.div`
  ${flex(undefined, undefined, "column")};
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

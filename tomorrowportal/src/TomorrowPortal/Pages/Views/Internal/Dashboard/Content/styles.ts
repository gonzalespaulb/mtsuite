import styled from "styled-components";
import { flex } from "../../../../../utils/helpers";

export const MainContainer = styled.div`
  padding: 16px;
  flex: 1;
  width: 100%;
  ${flex("flex-end", "flex-end")}
`;

export const BarChart = styled.div`
  width: 800px;
  height: 500px;
//   border: 1px solid black;
`;
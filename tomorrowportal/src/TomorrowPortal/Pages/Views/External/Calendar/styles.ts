import styled from "styled-components";
import { colors } from "../../../../utils/colors";
import { flex } from "../../../../utils/helpers";
import { logoPrimary, menuPrimary } from "../../assets";

export const MainContainer = styled.div`
  width: 100%;
  min-height: 100%;
  background: #eff0f4;
  ${flex(undefined, undefined, "column")}
`;

export const NavBar = styled.div`
  width: 100%;
  padding: 16px;
  background: ${colors.secondary};
  z-index: 10;
  position: sticky;
  top: 0;
  ${flex("space-between", "center")}
`;

export const Logo = styled.div`
  height: 30px;
  aspect-ratio: 1 /1;
  background-image: url(${logoPrimary});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const Menu = styled.div`
  height: 20px;
  aspect-ratio: 1 /1;
  background-image: url(${menuPrimary});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

import styled from "styled-components";
import { zLayer } from "../../../../utils/zIndex";

export const MainContainer = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: ${zLayer.toast};

  @media (max-width: 600px) {
    top: 0;
    right: 0;
    width: 100%;
    padding: 16px;
  }
`;

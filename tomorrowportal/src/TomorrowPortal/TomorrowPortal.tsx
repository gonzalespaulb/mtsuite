import Pages from "./Pages/Pages";
import { BrowserRouter } from "react-router-dom";
import { MainContainer } from "./styles";

const TomorrowPortal = () => {
  return (
    <BrowserRouter>
      <MainContainer>
        <Pages />
      </MainContainer>
    </BrowserRouter>
  );
};

export default TomorrowPortal;

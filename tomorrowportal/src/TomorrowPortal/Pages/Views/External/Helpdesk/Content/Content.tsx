import { useNavigate } from "react-router-dom";
import { emailPrimary, homePrimary, phonePrimary } from "../../../assets";
import {
  Back,
  BackBtn,
  BackContainer,
  ContactInfo,
  ContactInfoContainer,
  ContactsContainer,
  Heading,
  Icon,
  MainContainer,
  Map,
  SubHeading,
} from "./styles";

const Content = () => {
  const navigate = useNavigate();

  return (
    <MainContainer> 
      <BackContainer>
        <Back onClick={() => navigate("/dashboardExternal")}>
          <BackBtn />
          <span>Back</span>
        </Back>
      </BackContainer>
        <Heading>Need Help?</Heading>
        <SubHeading>
          We're here for you. Give us a holler using any of the contacts below. Talk to you soon!
        </SubHeading>
      <Map />
      <ContactsContainer>
        <ContactInfoContainer>
          <Icon icon={phonePrimary} />
          <ContactInfo onClick={() => window.open(`tel:+19709230544`)}>(970) 923-0544</ContactInfo>
        </ContactInfoContainer>
        <ContactInfoContainer>
          <Icon icon={emailPrimary}/>
          <ContactInfo onClick={() => window.open('mailto:rbaker@aspensnowmass.com')}>rbaker@aspensnowmass.com</ContactInfo>
        </ContactInfoContainer>
        <ContactInfoContainer>
          <Icon icon={homePrimary} />
          <ContactInfo>
            Aspen Snowmass Ski Resort, Snowmass Village, CO
          </ContactInfo>
        </ContactInfoContainer>
      </ContactsContainer>

    </MainContainer>
  );
};
export default Content;

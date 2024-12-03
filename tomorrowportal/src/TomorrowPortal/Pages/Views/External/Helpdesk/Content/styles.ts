import styled from "styled-components";
import { colors } from "../../../../../utils/colors";
import { backArrowPrimary, snowmass } from "../../../assets";
import { inter } from "../../../../../utils/fonts";
import { flex } from "../../../../../utils/helpers";

export const MainContainer = styled.div`
  flex: 1;
  width: 100%;
  padding: 16px;
  ${flex(undefined, undefined, "column")};
`;

export const BackContainer = styled.div`
  width: 100%;
  height: 65px;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 1px;
  font-weight: ${inter.semiBold};
  color: ${colors.primary};
  ${flex(undefined, "center")}
`;

export const Back = styled.div`
  ${flex(undefined, "center")}
  cursor: pointer;
`;

export const BackBtn = styled.div`
  height: 30px;
  width: 30px;
  margin-right: 8px;
  background-image: url(${backArrowPrimary});
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
`;

export const ContactsContainer = styled.div`
  ${flex(undefined, undefined, "column")}
  flex: 0;
  width: 100%;
  margin-bottom: 24px;
`;

export const Heading = styled.span`
  font-size: 32px;
  line-height: 32px;
  margin-bottom: 8px;
  font-weight: ${inter.bold};
  color: ${colors.primary};
`;

export const SubHeading = styled.span`
  color: ${colors.primary};
  font-size: 14px;
  line-height: 24px;
  font-weight: ${inter.regular};
  margin-bottom: 16px;
`;

export const ContactInfoContainer = styled.div`
  ${flex(undefined, "center")}
  letter-spacing: 1px;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }

  :not(:last-child) {
    margin-bottom: 8px;
  }
`;

interface IIcon {
  icon: string;
}

export const Icon = styled.div<IIcon>`
  margin-right: 8px;
  height: 15px;
  width: 15px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${(props) => props.icon});
`;

export const ContactInfo = styled.span`
  display: block;
  font-weight: ${inter.medium};
  font-size: 12px;
  line-height: 18px;
  color: ${colors.primary};
`;

export const Map = styled.div`
  height: 250px;
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${snowmass});
  border-radius: 5px;
  margin-bottom: 16px;
  border: 1px solid ${colors.primary};
`;

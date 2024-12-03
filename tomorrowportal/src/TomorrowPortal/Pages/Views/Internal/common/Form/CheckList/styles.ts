import styled from "styled-components";
import { inter } from "../../../../../../utils/fonts";
import { colors } from "../../../../../../utils/colors";
import { flex } from "../../../../../../utils/helpers";

export const MainContainer = styled.div`

${flex(undefined, undefined, "column")}
`

export const Label  = styled.span`
font-size: 16px;
line-height: 16px;
font-weight: ${inter.semiBold};
color: ${colors.primary};
margin-bottom: 24px;
display: block;
`;

export const Item = styled.div`
${flex(undefined, "center")}

:not(:last-child) {
  margin-bottom: 16px;
}
`;

interface FilledIndicatorProps {
    isFilled: boolean;
  }

export const FilledIndicator = styled.div<FilledIndicatorProps>`
height: 15px;
width: 15px;
margin-right: 8px;
border-radius: 50%;
border: 1px solid ${colors.primary};
background: ${(props) => (props.isFilled ? colors.primary : "transparent")};
transition: 0.3s ease;
`;

export const ItemName = styled.span`
font-size: 14px;
line-height: 14px;
opacity: 0.5;
font-weight: ${inter.medium};
`;
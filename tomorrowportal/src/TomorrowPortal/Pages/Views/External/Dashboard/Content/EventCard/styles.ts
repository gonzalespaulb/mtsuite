import styled from "styled-components";
import { inter } from "../../../../../../utils/fonts";
import { flex } from "../../../../../../utils/helpers";
import { colors } from "../../../../../../utils/colors";

export const MainContainer = styled.div`
  width: 275px;
  background: ${colors.secondary};
  flex-shrink: 0;
  border-radius: 10px;
  overflow: hidden;
  padding: 5px;

  :not(:last-child) {
    margin-right: 8px;
  }
`;

interface IPositionColor {
  light: string;
  dark: string;
}

interface DateContainerProps {
  positionColor: IPositionColor;
}

export const DateContainer = styled.div<DateContainerProps>`
  padding: 16px;
  border-radius: 5px;
  width: 100%;
  color: ${(props) => props.positionColor.dark};
  background: ${(props) => props.positionColor.light};
  ${flex(undefined, undefined, "column")}
  `;

export const Month = styled.span`
  font-size: 24px;
  font-weight: ${inter.regular};
`;

export const Date = styled.span`
  font-size: 64px;
  line-height: 64px;
  margin: 2px 0;
  font-weight: ${inter.bold};
`;

export const Day = styled.span`
  font-size: 24px;
  line-height: 24px;
  font-weight: ${inter.regular};
`;

export const EventInfo = styled.div`
  width: 100%;
  padding: 16px;
  ${flex(undefined, undefined, "column")}
`;

export const InfoRow = styled.div`
  ${flex(undefined, "center")}
  color: ${colors.primary};

  :not(:last-child) {
    margin-bottom: 8px;
  }
`;

export const Key = styled.span`
  font-size: 14px;
  line-height: 14px;
  font-weight: ${inter.regular};
  margin-right: 2px;
  letter-spacing: 1px;
`;

export const Value = styled.span`
  font-size: 14px;
  line-height: 14px;
  font-weight: ${inter.bold};
  letter-spacing: 1px;
`;

export const FullScheduleBtn = styled.div`
  font-size: 12px;
  line-height: 12px;
  font-weight: ${inter.semiBold};
  color: ${colors.secondary};
  padding: 16px;
  background: ${colors.primary};
  border-radius: 10px;
  ${flex("center", "center")}
`;

import styled from "styled-components";
import { colors } from "../../../../../../utils/colors";
import { inter } from "../../../../../../utils/fonts";
import { flex } from "../../../../../../utils/helpers";

interface MainContainerProps {
    dayBoxColor: string;
    today: boolean;
}

export const MainContainer = styled.div<MainContainerProps>`
    aspect-ratio: 1 / 1;
    width: 100%;
    font-size: 12px;
    line-height: 12px;
    font-weight: ${inter.semiBold};
    ${flex("center", "center")}
    border-right: 1px solid ${colors.primary};
    border-bottom: 1px solid ${colors.primary};
    background: ${(props) => props.dayBoxColor};
    color: ${(props) => props.today ? colors.secondary : colors.primary};
    position: relative;

    :nth-child(7n) {
        border-right: none;
    }

    :nth-last-child(-n + 7) {
        border-bottom: none;
    }
`;

interface ScheduleIndicatorProps {
    hasSchedules: boolean;
    today: boolean;
}

export const ScheduleIndicator = styled.div<ScheduleIndicatorProps>`
    height: 5px;
    width: 5px;
    border-radius: 50%;
    background: ${(props) => props.today ? colors.secondary : colors.primary};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 200%);
    display: ${(props) => props.hasSchedules ? "block" : "none"};
`;
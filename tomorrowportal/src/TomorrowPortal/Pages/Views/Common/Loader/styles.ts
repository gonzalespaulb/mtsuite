import styled, {keyframes} from "styled-components";
import { flex } from "../../../../utils/helpers";
import { colors } from "../../../../utils/colors";

const loadingAni = keyframes`
    0% {
        transform: translateY(0%);
        opacity: 0.5;
    }
    50% {
        transform: translateY(-100%);
        opacity: 1;
    }
    100% {
        transform: translateY(0%);
        opacity: 0.5;
    }
`;

export const MainContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    ${flex("center", "center")}
`;

export const LoadingBubble = styled.div`
    background: ${colors.primary};
    height: 20px;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    opacity: 0.6;
    animation-name: ${loadingAni};
    animation-duration: 1s;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    animation-delay: 0.2s;
    
    :first-child {
        margin-right: 12px;
        animation-duration: 1s;
        animation-timing-function: ease;
        animation-iteration-count: infinite;
        animation-delay: 0s;
    }

    :last-child {
        margin-left: 12px;
        animation-duration: 1s;
        animation-timing-function: ease;
        animation-iteration-count: infinite;
        animation-delay: 0.4s;
    }

`;
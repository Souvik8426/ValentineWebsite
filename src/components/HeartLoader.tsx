import styled, { keyframes } from 'styled-components';

const squareLen = 240;
const circleLen = 188.522;
const heartLen = 308.522;
const svgSize = 90;
const circleW = 60;
const totalAnim = '7s';
const delay = '0.1s';
const strokeColor = '#FF69B4';
const heartColor = '#FAA0A0';
const size = 200;

const squareAnim = keyframes`
  12% {
    stroke-dashoffset: 0;
  }
  43% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
  85% {
    stroke-dashoffset: 0;
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 0;
  }
`;

const leftCircleAnim = keyframes`
  12% {
    stroke-dashoffset: ${circleLen};
  }
  31% {
    stroke-dashoffset: 0;
    transform: translateY(0);
  }
  41% {
    stroke-dashoffset: 0;
    transform: translateY(${circleW/-2}px);
  }
  43% {
    stroke-dashoffset: 0;
    transform: translateY(${circleW/-2}px);
    opacity: 1;
  }
  85% {
    stroke-dashoffset: 0;
    transform: translateY(${circleW/-2}px);
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 0;
    transform: translateY(${circleW/-2}px);
    opacity: 0;
  }
`;

const rightCircleAnim = keyframes`
  12% {
    stroke-dashoffset: ${circleLen};
  }
  31% {
    stroke-dashoffset: 0;
    transform: translateX(0);
  }
  41% {
    stroke-dashoffset: 0;
    transform: translateX(${circleW/2}px);
  }
  43% {
    stroke-dashoffset: 0;
    transform: translateX(${circleW/2}px);
    opacity: 1;
  }
  85% {
    stroke-dashoffset: 0;
    transform: translateX(${circleW/2}px);
    opacity: 0;
  }
  100% {
    stroke-dashoffset: 0;
    transform: translateX(${circleW/2}px);
    opacity: 0;
  }
`;

const groupAnim = keyframes`
  43% {
    transform: rotate(0);
  }
  54% {
    transform: rotate(-45deg);
  }
  90% {
    transform: rotate(-45deg);
    opacity: 1;
  }
  97% {
    transform: rotate(-45deg);
    opacity: 0;
  }
  100% {
    transform: rotate(-45deg);
    opacity: 0;
  }
`;

const heartAnim = keyframes`
  55% {
    stroke-dashoffset: ${heartLen};
    fill: transparent;
  }
  70% {
    stroke-dashoffset: 0;
    fill: transparent;
  }
  87% {
    stroke-dashoffset: 0;
    fill: ${heartColor};
  }
  100% {
    stroke-dashoffset: 0;
    fill: ${heartColor};
  }
`;

const StyledHeartLoader = styled.svg`
  position: absolute;
  display: block;
  left: 50%;
  top: 50%;
  margin-top: ${size/-2}px;
  width: ${size}px;
  height: ${size}px;
  overflow: visible;
`;

const Group = styled.g`
  transform-origin: 0 ${svgSize}px;
  animation: ${groupAnim} ${totalAnim} ${delay} infinite;
`;

const Square = styled.path`
  stroke: ${strokeColor};
  stroke-dasharray: ${squareLen}, ${squareLen};
  stroke-dashoffset: ${squareLen};
  animation: ${squareAnim} ${totalAnim} ${delay} infinite;
`;

const Circle = styled.path<{ position: 'left' | 'right' }>`
  stroke: ${strokeColor};
  stroke-dasharray: ${circleLen}, ${circleLen};
  stroke-dashoffset: ${circleLen};
  transform-origin: ${circleW}px ${circleW/2}px;
  animation: ${props => props.position === 'left' ? leftCircleAnim : rightCircleAnim} ${totalAnim} ${delay} infinite;
`;

const HeartPath = styled.path`
  stroke: ${heartColor};
  fill: transparent;
  stroke-dasharray: ${heartLen}, ${heartLen};
  stroke-dashoffset: ${heartLen};
  animation: ${heartAnim} ${totalAnim} ${delay} infinite;
`;

const HeartLoader = () => {
  return (
    <StyledHeartLoader
      viewBox="0 0 90 90"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <Group>
        <Square
          strokeWidth="1"
          fill="none"
          d="M0,30 0,90 60,90 60,30z"
        />
        <Circle
          position="left"
          strokeWidth="1"
          fill="none"
          d="M60,60 a30,30 0 0,1 -60,0 a30,30 0 0,1 60,0"
        />
        <Circle
          position="right"
          strokeWidth="1"
          fill="none"
          d="M60,60 a30,30 0 0,1 -60,0 a30,30 0 0,1 60,0"
        />
        <HeartPath
          strokeWidth="2"
          d="M60,30 a30,30 0 0,1 0,60 L0,90 0,30 a30,30 0 0,1 60,0"
        />
      </Group>
    </StyledHeartLoader>
  );
};

export default HeartLoader;

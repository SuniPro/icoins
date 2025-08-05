/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css, Theme, useTheme } from "@emotion/react";
import { useWindowScroll } from "../../hooks/useWheel";

interface SvgDefsProps {
  width: number;
  height: number;
  curveH: number;
  radius: number;
  cy: number;
}
function SvgDefs(props: SvgDefsProps) {
  const { width, height, curveH, radius, cy } = props;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: "absolute", top: 0, left: 0 }}
      aria-hidden="true"
    >
      <defs>
        <clipPath id="curved-bottom">
          {/* 위쪽은 직선으로, 높이 = height - curveH */}
          <rect x={0} y={0} width={width} height={height - curveH} />
          {/* 아래는 원의 일부 */}
          <circle cx={width / 2} cy={cy} r={radius} />
        </clipPath>
      </defs>
    </svg>
  );
}

export function ScrollImage(props: {
  view: boolean;
  width: number;
  image: string;
}) {
  const { view, width, image } = props;

  const { scrollY } = useWindowScroll();

  const theme = useTheme();
  const containerWidth = width;
  const containerHeight = Math.round((width * 2) / 4);

  // 2) 화면 크기에 따른 곡선 높이(px)
  let curveH: number;
  if (width >= 1280) {
    curveH = 79;
  } else if (width >= 1024) {
    curveH = 55;
  } else if (width >= 640) {
    curveH = 25;
  } else {
    curveH = 15;
  }

  // 3) 반경 계산: r = (4h² + l²) / (8h)
  const radius = (4 * curveH * curveH + width * width) / (8 * curveH);

  // 4) circle 중심 y 좌표
  const cy = containerHeight - radius;

  return (
    <Container
      width={containerWidth}
      height={containerHeight}
      isDown={view && scrollY > 0}
    >
      <div></div>
      <SvgDefs
        width={containerWidth}
        height={containerHeight}
        curveH={curveH}
        radius={radius}
        cy={cy}
      />
      <ImageWrapper clipPathId="curved-bottom">
        <Img src={image} alt="Hero" />
        <OverlayGradient width={containerWidth} height={containerHeight} />
      </ImageWrapper>
      <Bubbles>
        <Bubble1 />
        <Bubble2 />
        <Bubble3 />
        <Bubble4 />
      </Bubbles>

      <FadeContainer height={containerHeight}>
        <div
          css={css`
            transform: scale(1.6);

            transition: transform 700ms ease-in-out;

            @media ${theme.deviceSize.phone} {
              transform: scale(0.4);
            }

            @media ${theme.deviceSize.tablet} {
              transform: scale(0.8);
            }

            @media ${theme.deviceSize.desktop} {
              transform: scale(1.4);
            }
          `}
        >
          <Title>Icoins helps you with your crypto trading.</Title>
          <Text theme={theme} width={containerWidth * 0.6}>
            From direct coin trading to a payback service through our
            partnerships with OKX, BYBIT, BINGX, and Gate.io, you can get all
            these services in one place.
          </Text>
        </div>
      </FadeContainer>
    </Container>
  );
}

const Container = styled.div<{
  width: number;
  height: number;
  isDown: boolean;
}>(
  ({ width, height, isDown }) => css`
    position: relative;
    width: ${width}px;
    overflow: ${isDown ? "hidden" : "visible"};

    isolation: isolate;

    /* static으로 선언해야 height 변경시 트랜지션이 먹음 */
    transition: height 500ms ease-in-out;

    /* height가 0이 되면 컨테이너가 “접혀” 아래 컴포넌트가 위로 당겨짐 */
    height: ${isDown ? 0 : height}px;
  `,
);

const Bubbles = styled.div`
  position: absolute;
  bottom: 0;
  inset: 0;
  z-index: -1;
`;

export const Bubble1 = styled.div`
  position: absolute; /* absolute */
  aspect-ratio: 2 / 1; /* aspect-[2] */
  border-radius: 9999px;
  background-color: #037aed; /* bg-primaryEarthGreen → azure */
  filter: blur(50px); /* blur-[50px] */
  left: 5%; /* start-[5%] */
  bottom: 0;
  width: 50%; /* w-1/2 */
  opacity: 1; /* opacity-100 */
  transition:                /* transition-[opacity,filter] duration-800 ease-in [transition-delay:1500ms] */
    opacity 800ms ease-in 1500ms,
    filter 800ms ease-in 1500ms;

  @media (min-width: 1024px) {
    /* desktop-sm:start-0 desktop-sm:w-[60%] */
    left: 0;
    width: 60%;
  }
`;

export const Bubble2 = styled.div`
  position: absolute;
  z-index: -10;
  aspect-ratio: 2 / 1;
  border-radius: 9999px;
  background-color: #037aed; /* bg-primarySkyBlue → azure */
  filter: blur(50px);
  bottom: 0;
  left: 45%; /* start-[45%] */
  width: 50%;
  opacity: 1;
  transition:
    opacity 800ms ease-in 1500ms,
    filter 800ms ease-in 1500ms;

  @media (min-width: 1024px) {
    /* desktop-sm:end-0 desktop-sm:w-[60%] */
    left: auto;
    right: 0;
    width: 60%;
  }
`;

export const Bubble3 = styled.div`
  position: absolute;
  z-index: -10;
  aspect-ratio: 2 / 1;
  border-radius: 9999px;
  background-color: #037aed; /* bg-primarySunOrange → azure */
  filter: blur(20px); /* blur-[20px] */
  bottom: 0;
  left: -10%; /* start-[-10%] */
  width: 20%; /* w-1/5 */
  opacity: 1;
  transition:
    opacity 800ms ease-in 1500ms,
    filter 800ms ease-in 1500ms;

  @media (min-width: 640px) {
    /* tablet-sm:blur-[60px] desktop-sm:bottom-[68%] desktop-sm:start-[-15%] desktop-sm:w-[25%] */
    filter: blur(60px);
    left: -15%;
    width: 25%;
  }
  @media (min-width: 1024px) {
    filter: blur(100px);
  }
`;

export const Bubble4 = styled.div`
  position: absolute;
  z-index: -10;
  aspect-ratio: 2 / 1;
  border-radius: 9999px;
  background-color: #037aed; /* bg-primaryOceanBlue → azure */
  filter: blur(20px);
  bottom: 0;
  right: -15%; /* end-[-15%] */
  width: 30%; /* w-[30%] */
  opacity: 1;
  transition:
    opacity 800ms ease-in 1500ms,
    filter 800ms ease-in 1500ms;

  @media (min-width: 640px) {
    /* tablet-sm:blur-[60px] desktop-sm:bottom-[68%] */
    filter: blur(60px);
  }
  @media (min-width: 1024px) {
    filter: blur(100px);
  }
`;

const ImageWrapper = styled.div<{ clipPathId: string }>(
  ({ clipPathId }) => css`
    position: absolute;
    inset: 0;
    clip-path: url(#${clipPathId});
    overflow: hidden;
    z-index: 0;
  `,
);

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;

  aspect-ratio: 10/7;
`;

const OverlayGradient = styled.div<{ width: number; height: number }>(
  ({ width, height }) => css`
    position: absolute;
    bottom: 0;
    width: ${width}px;
    height: ${height}px;
    z-index: 1;
    background-image: linear-gradient(
      180deg,
      transparent 30%,
      rgba(0, 0, 0, 0.8) 107.29%
    );
  `,
);

const FadeContainer = styled.div<{ height: number }>(
  ({ height }) => css`
    position: relative;
    width: 100%;
    height: ${height}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    transition:
      opacity 500ms ease-in-out,
      transform 500ms ease-in-out;
  `,
);

const Title = styled.h1`
  display: block;
  user-select: none;
  color: #fff;
  text-align: center;
  white-space: pre-line;

  /* 폰트 사이즈 */
  font-size: 1.5rem;
  line-height: 1.75rem;
  font-weight: 800;
  @media (min-width: 640px) {
    font-size: 2rem;
    line-height: 2.25rem;
  }
  @media (min-width: 1280px) {
    font-size: 2.5rem;
    line-height: 3rem;
  }
`;

const Text = styled.span<{ theme: Theme; width: number }>(
  ({ theme, width }) => css`
    width: ${width}px;
    margin-top: 1rem;
    color: ${theme.mode.textReverse};

    transition-property: opacity, transform;
    transition-duration: calc(700ms * var(1.2, 1));
    transition-timing-function: ease-in-out;

    transition: transform 500ms ease-in-out;
  `,
);

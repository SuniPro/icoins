/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css, Theme, useTheme } from "@emotion/react";
import { useWindowContext } from "../context/WindowContext";
import { useProportionHook } from "../hooks/useWindowHooks";
import { Header } from "../components/layouts/Frames/Header";
import { ExtentButton } from "../components/styled/Button/ExtentButton";
import HelpIcon from "@mui/icons-material/Help";
import CelebrationIcon from "@mui/icons-material/Celebration";
import TelegramIcon from "@mui/icons-material/Telegram";
import { SearchBar } from "../components/Search";
import { MainNavigation } from "../components/layouts/Frames/MainNavigation";
import {
  Advertisement,
  AdvertisementPropsType,
} from "../components/Card/Advertisement";

import basketBall from "../assets/image/game/sport/basketball-goal.jpg";
import f1 from "../assets/image/game/sport/matt-seymour-3uu5_kn1k_Y-unsplash.jpg";
import baseBall from "../assets/image/game/sport/baseball.jpg";

import { uid } from "uid";

export const DUMMY_AD: AdvertisementPropsType[] = [
  {
    image: basketBall,
    color: "#ff2121",
    title: "ICOINS 특별 이벤트.",
    description:
      "지금 OKX 에 초대 코드를 입력하고 가입하면 0.6 Payback 이 주어집니다.",
    tag: [
      { name: "OKX", color: "#ff2121" },
      { name: "PAYBACK-EVENT", color: "#0033ff" },
    ],
    link: "",
  },
  {
    image: f1,
    color: "#162dd3",
    title: "F1 특별 이벤트",
    description:
      "Fill out the form and the algorithm will offer the right team of experts",
    tag: [
      { name: "BYNANCE", color: "#D3B19AFF" },
      { name: "packaging", color: "#70b3b1" },
    ],
    link: "",
  },
  {
    image: baseBall,
    color: "#D3B19AFF",
    title: "KBO 특별 이벤트",
    description:
      "Fill out the form and the algorithm will offer the right team of experts",
    tag: [
      { name: "branding", color: "#D3B19AFF" },
      { name: "packaging", color: "#70b3b1" },
    ],
    link: "",
  },
  {
    image: basketBall,
    color: "#ff2121",
    title: "NBA 리그 개최 특별 이벤트.",
    description: "지금 승리에 배팅하면 원래 배당의 0.5% PayBack이 주어집니다.",
    tag: [
      { name: "BASKETBALL", color: "#ff2121" },
      { name: "NBA", color: "#0033ff" },
    ],
    link: "",
  },
  {
    image: f1,
    color: "#162dd3",
    title: "F1 특별 이벤트",
    description:
      "Fill out the form and the algorithm will offer the right team of experts",
    tag: [
      { name: "branding", color: "#D3B19AFF" },
      { name: "packaging", color: "#70b3b1" },
    ],
    link: "",
  },
  {
    image: baseBall,
    color: "#D3B19AFF",
    title: "KBO 특별 이벤트",
    description:
      "Fill out the form and the algorithm will offer the right team of experts",
    tag: [
      { name: "branding", color: "#D3B19AFF" },
      { name: "packaging", color: "#70b3b1" },
    ],
    link: "",
  },
];

const advertiseSizeCalculator = (
  theme: Theme,
  windowWidth: number,
  componentWidth: number,
  gap: number,
  length: number,
): number => {
  const componentTotalGap = gap * (length - 1);
  const innerSize = componentWidth * 0.9;

  const isDesktop = windowWidth >= theme.windowSize.HD;
  const isTablet =
    windowWidth < theme.windowSize.HD && windowWidth > theme.windowSize.tablet;

  if (isDesktop) {
    return (innerSize - componentTotalGap) / 3;
  } else if (isTablet) {
    return (innerSize - componentTotalGap) / 2;
  } else {
    return innerSize - componentTotalGap;
  }
};

export function Main() {
  const theme = useTheme();
  const { windowWidth } = useWindowContext();

  const { size } = useProportionHook(
    windowWidth,
    windowWidth * 0.9,
    theme.windowSize.tablet,
  );

  const mainComponentSize =
    size <= theme.windowSize.mobile ? windowWidth : size;

  return (
    <>
      <Header />
      <MainContainer width={mainComponentSize} theme={theme}>
        <MainNavigation gap="margin-bottom : 70px" />
        <SearchBar />
        <div
          css={css`
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            width: 90%;

            padding: 60px 0;

            gap: 20px;

            box-sizing: border-box;

            justify-content: space-between;

            @media screen and (max-width: ${theme.windowSize.tablet}px) {
              justify-content: center;
            }
          `}
        >
          {DUMMY_AD.map((ad, index, array) => (
            <div key={`${uid()}-${ad.image}-${index}`}>
              <Advertisement
                contents={ad}
                width={advertiseSizeCalculator(
                  theme,
                  windowWidth,
                  mainComponentSize,
                  20,
                  array.length,
                )}
                height={
                  advertiseSizeCalculator(
                    theme,
                    windowWidth,
                    mainComponentSize,
                    10,
                    array.length,
                  ) * 0.6
                }
              />
            </div>
          ))}
        </div>
      </MainContainer>
      <ExtentButton
        option={{
          count: 3,
          key: "top-left",
          icons: [
            <HelpIcon fontSize="medium" />,
            <CelebrationIcon fontSize="medium" />,
            <TelegramIcon fontSize="medium" />,
          ],
        }}
      />
    </>
  );
}

const MainContainer = styled.main<{ width: number; theme: Theme }>(
  ({ width, theme }) => css`
    width: ${width}px;
    transform: translateY(90px);
    height: auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: ${theme.mode.cardBackground};
    border-radius: ${theme.borderRadius.softBox};
  `,
);

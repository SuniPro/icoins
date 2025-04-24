/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { ContentsContainer } from "../components/layouts/Layouts";
import { Logo, LogoContainer, LogoText } from "../components/Logo/Logo";
import { css, keyframes, Theme, useTheme } from "@emotion/react";
import { InteractiveForm } from "../components/Form/InteractiveForm";
import { useWindowContext } from "../context/WindowContext";
import { useProportionHook } from "../hooks/useWindowHooks";

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export function Main() {
  const theme = useTheme();
  const { windowWidth } = useWindowContext();

  const { size } = useProportionHook(windowWidth, 600, theme.windowSize.tablet);
  const font = useProportionHook(windowWidth, 20, theme.windowSize.mobile);
  const logo = useProportionHook(windowWidth, 28, theme.windowSize.mobile);
  return (
    <MainContainer width={size}>
      <LogoContainer width={300} height={140}>
        <Logo fontSize={80} />
        <SubjectTitle theme={theme}>
          오직 당신을 위한 프라이빗 안전거래 시스템
        </SubjectTitle>
      </LogoContainer>
      <GuideLine theme={theme}>
        <SubjectTitle theme={theme} fontSize={font.size}>
          업비트와 빗썸은 필수입니다.
        </SubjectTitle>
        <SubjectTitle theme={theme} fontSize={font.size}>
          <LogoText fontSize={logo.size} /> 의 이용방법을 모르신다면,&nbsp;
          <a
            href={import.meta.env.VITE_TELEGRAM_URL}
            css={css`
              font-size: ${font.size}px;
              cursor: pointer;
              padding: 0;
              margin: 0;
            `}
          >
            여기를 클릭하세요.
          </a>
        </SubjectTitle>
      </GuideLine>
      <StyledContentsContainer>
        <InteractiveForm windowWidth={windowWidth} />
      </StyledContentsContainer>
    </MainContainer>
  );
}

const SubjectTitle = styled.span<{ theme: Theme; fontSize?: number }>(
  ({ theme, fontSize }) => css`
    font-family: ${theme.mode.font.component.itemTitle};
    font-size: ${fontSize}px;
  `,
);

const MainContainer = styled.main<{ width: number }>(
  ({ width }) => css`
    width: ${width}px;
    transform: translateY(1%);
    height: auto;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    ul {
      padding: 0;
      li {
        text-align: left;
        margin: 0 0 10px;
      }
    }
  `,
);

const GuideLine = styled.div<{ theme: Theme }>(
  ({ theme }) => css`
    animation: ${fadeUp} 0.4s ease-in-out;
    animation-fill-mode: both;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 50px;

    gap: 10px;

    @media ${theme.deviceSize.phone} {
      margin-top: 10px;
      margin-bottom: 20px;
    }
  `,
);

const StyledContentsContainer = styled(ContentsContainer)`
  animation: ${fadeUp} 0.7s ease-in-out;
  animation-fill-mode: both;
`;

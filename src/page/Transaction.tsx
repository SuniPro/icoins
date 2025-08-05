/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { ContentsContainer } from "../components/layouts/Layouts";
import { Logo, LogoContainer } from "../components/Logo";
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

export function Transaction() {
    const theme = useTheme();
    const { windowWidth } = useWindowContext();

    const { size } = useProportionHook(windowWidth, 600, theme.windowSize.tablet);
    return (
        <MainContainer width={size}>
            <LogoContainer width={300} height={140}>
                <Logo fontSize={80} />
                <SubjectTitle theme={theme}>
                    오직 당신을 위한 프라이빗 안전거래 시스템
                </SubjectTitle>
            </LogoContainer>
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

const StyledContentsContainer = styled(ContentsContainer)`
  animation: ${fadeUp} 0.7s ease-in-out;
  animation-fill-mode: both;
`;
